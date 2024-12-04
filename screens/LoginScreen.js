import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { UserContext } from '../context/UserContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(UserContext);

  const handleLogin = async () => {
    try {
       // reemplazar la URL y método con la API real cuando esté lista
      /* let response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }); */
      // Simulación de una respuesta de la API
      let response = {
        ok: true,
        json: async () => ({
          name: 'John Restrepo',
          email: 'marchainca@gmail.com',
          profileImageUrl: 'https://southcentralus1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=194114&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!b283VhQeqUmzY5SYwg_4Uq_NBHTEoOxBsnZud7Wx-D34HrhcdR0NRqyeaLZdtBGr%2Fitems%2F01VIV2P5AONA5XFN7BVYQIBCZ4AEAAAAAA%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI1NjM3NmY2Zi0xZTE0LTQ5YTktYjM2My05NDk4YzIwZmY4NTIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzE2MTgwMDAifQ.x_SqeJqeb9s53jnOJqQbdZ4gzeru-LR7otpGZpCIRqIoNRrnBfaOFmiP1PkAK8M22rcOu7m-Cfbp3bESb8DWgDgvDg-m3nq1Yh-dtKr5VSuMwHw7BEshuP0N20w7PGISNM4RAbhnpJqMkMPg3PLHpoOYII7J_j2s6gotLn-W1xYGYgFFhXSFW2wxz2axwTisZvPx45fdizph2jkjwCLRTTEzVJ1K3t6x0-ZcCSVcSz2D9tcB3eHmzuP6d3AFsyeLdEIicUv77XNplZhSnlxhvO1nNWUZcR1ncT9ayAaeCDIxbxWe8eMI4weTlWvXWwZYaOwhR3IlaPGg73YMem50OUTZhNX2f6346A2VIhn-2rdCgXSMQ9uPITnYPVD94x1Q.zSO3TJMe5pYIKy64OYtF7lHQXg5zFi5j6nDResdN7VI%26version%3DPublished&cb=63519352448&encodeFailures=1&width=354&height=472',
          role: 'admin',
        }),
      };

      if (response.ok) {
        const data = await response.json();

        // Suponemos que `data` tiene la estructura:
        // { name, email, profileImageUrl, role }
        login({
          name: data.name,
          email: data.email,
          profileImageUrl: data.profileImageUrl,
          role: data.role,
        });

        // Navegar a la pantalla principal
        navigation.navigate("Home");
      } else {
        // Manejo de error en caso de credenciales inválidas
        Alert.alert("Error", "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo y Título */}
      <Image source={require('../assets/clave.png')} style={styles.logo} />
      <Text style={styles.foundationText}>Creando Futuro</Text>

      {/* Título de Acceso */}
      <Text style={styles.title}>Acceso</Text>
      <Text style={styles.subtitle}>¡Hola! Qué bueno verte de nuevo.</Text>

      {/* Campo de Correo Electrónico */}
      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="ejemplo@email.com"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de Contraseña */}
      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPasswordButton}>
          <Text style={styles.showPasswordText}>{showPassword ? "🙈" : "👁️"}</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de Ingreso */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Ingresa</Text>
      </TouchableOpacity>

      {/* Enlace de ¿Olvidaste tu contraseña? */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>¿Has olvidado tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  foundationText: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
  },
  showPasswordText: {
    fontSize: 18,
    color: '#A0A0A0',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#A0A0A0',
    fontSize: 14,
  },
});

export default LoginScreen;
