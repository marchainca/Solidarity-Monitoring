import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AttendanceFormScreen = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Registro de Inasistencias',
    });
  }, []);

  const [activity, setActivity] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    documentType: '',
    documentNumber: '',
    email: '',
    address: '',
    neighborhood: '',
    policy: '',
    emergencyContact: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log('Formulario enviado:', formData);
    alert('Registro de inasistencia enviado');
    // Aquí puedes llamar a la API para enviar los datos del formulario
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

        <Text style={styles.label}>Edad:</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(text) => handleInputChange('age', text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Tipo de Documento:</Text>
        <TextInput
          style={styles.input}
          value={formData.documentType}
          onChangeText={(text) => handleInputChange('documentType', text)}
        />

        <Text style={styles.label}>N° Documento:</Text>
        <TextInput
          style={styles.input}
          value={formData.documentNumber}
          onChangeText={(text) => handleInputChange('documentNumber', text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Dirección:</Text>
        <TextInput
          style={styles.input}
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />

        <Text style={styles.label}>Barrio:</Text>
        <TextInput
          style={styles.input}
          value={formData.neighborhood}
          onChangeText={(text) => handleInputChange('neighborhood', text)}
        />

        <Text style={styles.label}>Póliza:</Text>
        <TextInput
          style={styles.input}
          value={formData.policy}
          onChangeText={(text) => handleInputChange('policy', text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Contacto de Emergencia:</Text>
        <TextInput
          style={styles.input}
          value={formData.emergencyContact}
          onChangeText={(text) => handleInputChange('emergencyContact', text)}
          keyboardType="phone-pad"
        />
      </View>

      {/* Botón para enviar */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Registrar Inasistencia</Text>
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
