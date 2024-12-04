import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CameraView } from 'expo-camera';
import { CameraPermissionContext } from '../context/CameraPermissionContext';

const NewMemberScreen = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Registro Nuevo Integrante',
    });
  }, []);
  
    const [facing, setFacing] = useState('front');
    const { hasCameraPermission, errorMessage, setErrorMessage } = useContext(CameraPermissionContext);
    const cameraRef = React.useRef(null);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (hasCameraPermission === null || hasCameraPermission === false) {
          setErrorMessage('Permiso de cámara no concedido. Verifica en los ajustes.');
        }
      }, [hasCameraPermission]);

  const handleFacialTraining = async () => {
    setIsCameraVisible(true);
  };

  const handleCapture = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        setIsCameraVisible(false);
        setIsUploading(true);

        // Simular una llamada a una API para enviar los datos del entrenamiento facial
        setTimeout(() => {
          setIsUploading(false);
          Alert.alert('Éxito', 'Entrenamiento facial completado.');
        }, 3000);
      } else {
        throw new Error('No se pudo acceder a la cámara.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo capturar la imagen.');
    }
  };

  const handleSubmit = () => {
    if (!name || !lastName || !email) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    // Aquí se puede integrar la API para guardar los datos del integrante
    Alert.alert('Éxito', 'Integrante registrado correctamente.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Integrante</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombres"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleFacialTraining}>
        <Text style={styles.buttonText}>Entrenamiento Facial</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      {isUploading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      )}

      {/* Modal de la cámara */}
      <Modal visible={isCameraVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <CameraView style={styles.camera} ref={cameraRef} facing={facing}
          >
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={() => handleCapture()}
              >
                <Text style={styles.captureButtonText}>Capturar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsCameraVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  captureButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  captureButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NewMemberScreen;
