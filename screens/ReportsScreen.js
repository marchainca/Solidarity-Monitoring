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
    if (!id) {
      Alert.alert('Error', 'Por favor introduce una identificación válida');
      return;
    }

    setLoading(true);
    try {
      // Simulación de la llamada a la API
      setTimeout(() => {
        const fakeData = {
            name: 'Alexander',
            lastName: 'Hincapié',
            profileImage: 'https://southcentralus1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=194114&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!b283VhQeqUmzY5SYwg_4Uq_NBHTEoOxBsnZud7Wx-D34HrhcdR0NRqyeaLZdtBGr%2Fitems%2F01VIV2P5AONA5XFN7BVYQIBCZ4AEAAAAAA%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI1NjM3NmY2Zi0xZTE0LTQ5YTktYjM2My05NDk4YzIwZmY4NTIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzE2MTgwMDAifQ.x_SqeJqeb9s53jnOJqQbdZ4gzeru-LR7otpGZpCIRqIoNRrnBfaOFmiP1PkAK8M22rcOu7m-Cfbp3bESb8DWgDgvDg-m3nq1Yh-dtKr5VSuMwHw7BEshuP0N20w7PGISNM4RAbhnpJqMkMPg3PLHpoOYII7J_j2s6gotLn-W1xYGYgFFhXSFW2wxz2axwTisZvPx45fdizph2jkjwCLRTTEzVJ1K3t6x0-ZcCSVcSz2D9tcB3eHmzuP6d3AFsyeLdEIicUv77XNplZhSnlxhvO1nNWUZcR1ncT9ayAaeCDIxbxWe8eMI4weTlWvXWwZYaOwhR3IlaPGg73YMem50OUTZhNX2f6346A2VIhn-2rdCgXSMQ9uPITnYPVD94x1Q.zSO3TJMe5pYIKy64OYtF7lHQXg5zFi5j6nDResdN7VI%26version%3DPublished&cb=63519352448&encodeFailures=1&width=354&height=472',
        };

        setName(fakeData.name);
        setLastName(fakeData.lastName);
        setProfileImage(fakeData.profileImage);
        setLoading(false);
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener los datos del usuario.');
      setLoading(false);
    }
  };

  const handleReportSubmit = () => {
    // Mostrar notificación
    Toast.show({
      type: 'success',
      text1: 'Alexander Hincapié',
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
        <Text style={styles.label}>Reporte creador por</Text>
        <TextInput
          style={styles.input}
          value={`${user?.name} ${user?.lastName}`}
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
