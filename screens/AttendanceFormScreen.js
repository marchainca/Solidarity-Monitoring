import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from '../context/UserContext';

const AttendanceFormScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Registro de Inasistencias',
    });
  }, []);

  const { user } = useContext(UserContext);
  const [activity, setActivity] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    documentNumber: '',
    reason: '',
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // Estado para consultas
  const [suggestions, setSuggestions] = useState([]); // Almacenar sugerencias del backend

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  // Consultar al backend para buscar nombres
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]); // Limpiar sugerencias si no hay consulta
      return;
    }

    try {
      setIsFetching(true); // Inicia la consulta
      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}recognition/search?name=${query}`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.content || []); // Almacenar las sugerencias en el estado
      } else {
        console.error('Error al buscar sugerencias:', await response.text());
      }
    } catch (error) {
      console.error('Error al buscar sugerencias:', error);
    } finally {
      setIsFetching(false); // Finaliza la consulta
    }
  };

  // Seleccionar un nombre de las sugerencias
  const handleSuggestionSelect = (item) => {
    setFormData({
      firstName: item.name.trim(),
      lastName: item.lastName.trim(),
      documentNumber: item.documentNumber.toString(),
      reason: formData.reason, // Mantener el motivo si ya fue ingresado
    });
    setSuggestions([]); // Limpiar las sugerencias después de seleccionar
  };

  const handleSubmit = async () => {
    if (!activity || !formData.firstName || !formData.lastName || !formData.documentNumber || !formData.reason) {
      Alert.alert('Error', 'Por favor complete todos los campos.');
      return;
    }

    const requestData = {
      identificacion: formData.documentNumber,
      actividad: activity,
      motivo: formData.reason,
      fecha: selectedDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
    };

    try {
      setIsSubmitting(true);
      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}attendance/absences`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Inasistencia registrada correctamente.');
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', `No se pudo registrar la inasistencia: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al registrar la inasistencia:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FlatList
      data={[{ key: 'form' }]} // Representa todo el formulario como un único elemento
      renderItem={() => (
        <View style={styles.container}>
          <Text style={styles.header}>Formulario de Inasistencia</Text>

          {/* Selector de actividad */}
          <Picker
            selectedValue={activity}
            style={styles.picker}
            onValueChange={(itemValue) => setActivity(itemValue)}
          >
            <Picker.Item label="Seleccione una actividad" value="" />
            <Picker.Item label="Entrenamiento Fútbol" value="Entrenamiento Fútbol" />
            <Picker.Item label="Clases de Música" value="Clases de Música" />
            <Picker.Item label="Taller de Pintura" value="Taller de Pintura" />
          </Picker>

          {/* Nombres */}
          <Text style={styles.label}>Nombres:</Text>
          <TextInput
            style={styles.input}
            value={formData.firstName}
            onChangeText={(text) => {
              handleInputChange('firstName', text);
              fetchSuggestions(text); // Consultar al backend
            }}
          />
          {isFetching && <Text style={styles.loadingText}>Cargando...</Text>}
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleSuggestionSelect(item)}
                >
                  <Text style={styles.suggestionText}>{item.name.trim()}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Apellidos */}
          <Text style={styles.label}>Apellidos:</Text>
          <TextInput
            style={styles.input}
            value={formData.lastName}
            editable={false} // Campo no editable
          />

          {/* N° Documento */}
          <Text style={styles.label}>N° Documento:</Text>
          <TextInput
            style={styles.input}
            value={formData.documentNumber}
            keyboardType="numeric"
            editable={false} // Campo no editable
          />

          {/* Fecha */}
          <Text style={styles.label}>Fecha:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{selectedDate.toISOString().split('T')[0]}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Motivo */}
          <Text style={styles.label}>Motivo de la inasistencia:</Text>
          <TextInput
            style={styles.input}
            value={formData.reason}
            onChangeText={(text) => handleInputChange('reason', text)}
          />

          {/* Botón para enviar */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Registrando...' : 'Registrar Inasistencia'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.key}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  loadingText: { fontStyle: 'italic', marginBottom: 10 },
  suggestionItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  suggestionText: { fontSize: 16 },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AttendanceFormScreen;
