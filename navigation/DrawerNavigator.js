import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { UserContext } from '../context/UserContext';
import HomeScreen from '../screens/HomeScreen';
import IndicatorsScreen from '../screens/IndicatorsScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReportsScreen from '../screens/ReportsScreen'

const Drawer = createDrawerNavigator(); 

// Componente de contenido personalizado para el Drawer
function CustomDrawerContent(props) {
  const { user } = useContext(UserContext);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.profileImageUrl }} style={styles.profileImage} />
        <Text style={styles.profileName}>{user?.name}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
   
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: '#FF6F61', // Color de la opción activa
          drawerInactiveTintColor: '#333',   // Color de la opción inactiva
          drawerLabelStyle: {
            fontSize: 16,
          },
        }}
      >
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        <Drawer.Screen name="Indicadores" component={IndicatorsScreen} />
        <Drawer.Screen name="Asistencias" component={AttendanceScreen} />
        <Drawer.Screen name="Reportes" component={ReportsScreen} />
        <Drawer.Screen name="Configuraciones" component={SettingsScreen} />
      </Drawer.Navigator>
  
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#888',
  },
});
