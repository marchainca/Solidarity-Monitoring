import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { UserContext } from '../context/UserContext';

const ReportsScreen = () => {
  const { user } = useContext(UserContext);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    console.log("Data de user:", user )
    if (!id) {
      Alert.alert('Error', 'Por favor introduce una identificación válida');
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        identificacion: id,
      };
      const apiUrl = process.env.EXPO_PUBLIC_API_URL + "attendance/identify";
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data: ", data)
        setName(data.content.name);
        setLastName(data.content.lastName);
        setProfileImage(`data:image/jpeg;base64,${data.content.profileImage}`);
        setLoading(false);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', `No se pudo obtener los datos: ${errorData.message}`);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      setLoading(false);
    }
  };

  const handleReportSubmit = () => {
    Toast.show({
      type: 'success',
      text1: `${name} ${lastName}`,
      text2: 'Ha realizado un reporte.',
      visibilityTime: 8000,
    });

    setReport('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reporte</Text>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Foto</Text>
        </View>
      )}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Identificación</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduce la identificación"
          keyboardType="numeric"
          value={id}
          onChangeText={setId}
        />
        <TouchableOpacity style={styles.fetchButton} onPress={fetchUserData}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombres y Apellidos</Text>
        <TextInput
          style={styles.input}
          value={`${name} ${lastName}`}
          editable={false}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Reporte</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline={true}
          placeholder="Escribe el reporte aquí..."
          value={report}
          onChangeText={setReport}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Reporte creado por</Text>
        <TextInput
          style={styles.input}
          value={`${user?.name}`}
          editable={false}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleReportSubmit}>
        <Text style={styles.buttonText}>Enviar reporte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
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
    marginBottom: 20,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: '#888',
  },
  formGroup: {
    marginBottom: 15,
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
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  fetchButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReportsScreen;
