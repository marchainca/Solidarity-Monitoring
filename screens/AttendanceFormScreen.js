import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
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

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSubmit = async () => {
    if (!activity || !formData.firstName || !formData.lastName || !formData.documentNumber || !formData.reason) {
      Alert.alert('Error', 'Por favor complete todos los campos.');
      return;
    }

    const requestData = {
      identificacion: formData.documentNumber ,
      actividad: activity,
      motivo: formData.reason,
      fecha: selectedDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
    };

    try {
      setIsSubmitting(true);
      console.log("Data antes de enviar: ", requestData)
      const apiUrl = process.env.EXPO_PUBLIC_API_URL + "attendance/absences";
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
    <ScrollView style={styles.container}>
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

      {/* Formulario */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombres:</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(text) => handleInputChange('firstName', text)}
        />

        <Text style={styles.label}>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
        />

        <Text style={styles.label}>N° Documento:</Text>
        <TextInput
          style={styles.input}
          value={formData.documentNumber}
          onChangeText={(text) => handleInputChange('documentNumber', text)}
          keyboardType="numeric"
        />

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
        <Text style={styles.label}>Motivo de la inasistencia:</Text>
        <TextInput
          style={styles.input}
          value={formData.reason}
          onChangeText={(text) => handleInputChange('reason', text)}
        />
      </View>

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
    </ScrollView>
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
  infoContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
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
    justifyContent: 'center',
  },
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
