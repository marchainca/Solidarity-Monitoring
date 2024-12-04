import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { CameraView } from 'expo-camera';
import { CameraPermissionContext } from '../context/CameraPermissionContext';

const FaceRecognitionScreen = ({ navigation }) => {
  const [facing, setFacing] = useState('front'); //seleccionar camara
  const { hasCameraPermission, errorMessage, setErrorMessage } = useContext(CameraPermissionContext);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const cameraRef = React.useRef(null);
  

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Reconocimiento Facial',
    });
    if (hasCameraPermission === null || hasCameraPermission === false) {
      setErrorMessage('Permiso de cámara no concedido. Verifica en los ajustes.');
    }
  }, [hasCameraPermission]);

  const handleFaceRecognition = async () => {
    if (!cameraRef.current) {
      setErrorMessage('Error: Cámara no disponible.');
      return;
    }

    setIsRecognizing(true);

    try {
      setTimeout(() => {
        const isSuccessful = 1;
        if (isSuccessful) {
          navigation.navigate('AttendanceFormWithData', {
            recognizedData: {
              firstName: 'John Alexander',
              lastName: 'Restrepo Hincapié',
              age: '41',
              documentType: 'C.C',
              documentNumber: '4514538',
              email: 'correo@email.com',
              address: 'Calle 45 N° 20A-59',
              neighborhood: 'Villas de CAña Miel',
              policy: '1145236',
              emergencyContact: '3177582247',
            },
          });
        } else {
          setErrorMessage('Error en el reconocimiento facial. Intente nuevamente.');
        }
        setIsRecognizing(false);
      }, 3000);
    } catch (error) {
      setErrorMessage('Error inesperado: ' + error.message);
      setIsRecognizing(false);
    }
  };

  if (hasCameraPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No se concedió permiso para usar la cámara. Habilítelo en los ajustes.</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {hasCameraPermission && (
        <CameraView  style={styles.camera} ref={cameraRef} facing={facing} />
      )}
      {isRecognizing && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      )}
      <TouchableOpacity style={styles.button} onPress={handleFaceRecognition}>
        <Text style={styles.buttonText}>Iniciar Reconocimiento Facial</Text>
      </TouchableOpacity>
      <Modal
        visible={!!errorMessage}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setErrorMessage('')}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setErrorMessage('')}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  camera: {
    width: '100%',
    height: '60%',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '45%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#ff0000',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FaceRecognitionScreen;
