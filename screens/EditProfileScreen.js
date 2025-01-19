import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { UserContext } from '../context/UserContext';

const EditProfileScreen = () => {
  // Función para convertir la fecha de "DD/MM/YYYY" a "YYYY-MM-DD"
  const parseDate = (dateString) => {
    if (!dateString) return new Date(); // Si no hay fecha, usar la fecha actual
    if (dateString instanceof Date) return dateString; // Si ya es un objeto Date, retornarlo directamente
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const { user, updateUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(user?.profileImageUrl || '');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [idNumber, setIdNumber] = useState(user?.idNumber || '');
  const [birthdate, setBirthdate] = useState(parseDate(user?.birthdate));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  console.log("User->", user)
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) setBirthdate(selectedDate);
  };

  const handleChangeImage = () => {
    Alert.alert('Función no implementada', 'Cambiar imagen de perfil.');
  };

  const handleSaveChanges = async () => {
    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Lógica para guardar cambios
    const updatedData = {
      profileImage,
      name,
      email,
      idNumber,
      birthdate: birthdate instanceof Date ? birthdate.toISOString().split('T')[0] : '',
      password,
    };

    try {
      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}user/update`;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Perfil actualizado correctamente.');
        updateUser(updatedData); // Actualizar el contexto con los nuevos datos
      } else {
        const errorData = await response.json();
        Alert.alert('Error', `No se pudo actualizar el perfil: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {/* Cambiar Imagen */}
      <TouchableOpacity onPress={handleChangeImage}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.changeImageText}>Cambiar Imagen</Text>
      </TouchableOpacity>

      {/* Editar Nombre */}
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      {/* Editar Correo */}
      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      {/* Editar Número de Identificación */}
      <Text style={styles.label}>Número de Identificación</Text>
      <TextInput style={styles.input} value={idNumber} onChangeText={setIdNumber} keyboardType="numeric" />

      {/* Cambiar Fecha de Nacimiento */}
      <Text style={styles.label}>Fecha de Nacimiento</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => DateTimePickerAndroid.open({ value: birthdate, onChange: handleDateChange })}
      >
        <Text>
          {birthdate instanceof Date
            ? birthdate.toISOString().split('T')[0] // Mostrar fecha en formato YYYY-MM-DD
            : ''}
        </Text>
      </TouchableOpacity>

      {/* Cambiar Contraseña */}
      <Text style={styles.label}>Nueva Contraseña</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

      {/* Confirmar Contraseña */}
      <Text style={styles.label}>Confirmar Contraseña</Text>
      <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      {/* Botón para guardar cambios */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  changeImageText: {
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
