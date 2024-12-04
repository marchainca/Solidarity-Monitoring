import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AttendanceFormWithDataScreen = ({ route, navigation }) => {

    const [activity, setActivity] = useState('');
    const { recognizedData } = route.params;

    return (
        <ScrollView style={styles.container}>
            {/* Selector de actividad */}
            <View style={styles.container}>
            <Text style={styles.title}>Formulario de Asistencia</Text>

            <Picker
            selectedValue={activity}
            onValueChange={(itemValue) => setActivity(itemValue)}
            >
            <Picker.Item label="Seleccione una actividad" value="" />
            <Picker.Item label="Entrenamiento Fútbol" value="Entrenamiento Fútbol" />
            <Picker.Item label="Clases de Música" value="Clases de Música" />
            <Picker.Item label="Taller de Pintura" value="Taller de Pintura" />
            </Picker>

            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.input} value={recognizedData.firstName} editable={false} />

            <Text style={styles.label}>Apellido</Text>
            <TextInput style={styles.input} value={recognizedData.lastName} editable={false} />

            <Text style={styles.label}>Edad</Text>
            <TextInput style={styles.input} value={recognizedData.age} editable={false} />

            <Text style={styles.label}>Tipo de Documento</Text>
            <TextInput style={styles.input} value={recognizedData.documentType} editable={false} />

            <Text style={styles.label}>Número de Documento</Text>
            <TextInput style={styles.input} value={recognizedData.documentNumber} editable={false} />

            {/* Agregar más campos si es necesario */}

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Registrar Asistencia</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AttendanceFormWithDataScreen;
