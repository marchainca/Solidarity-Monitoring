import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ReportsListScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reports, setReports] = useState([]);

  // Simular carga de reportes
  useEffect(() => {
    // Aquí puedes reemplazar con una llamada al backend
    setReports([
      { id: '1', name: 'Juan Perez', report: 'Reporte 1' },
      { id: '2', name: 'María López', report: 'Reporte 2' },
    ]);
  }, []);

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Integrante"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredReports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.reportItem}
            onPress={() => navigation.navigate('ReportDetailScreen', { report: item })}
          >
            <Text style={styles.reportName}>{item.name}</Text>
            <Text style={styles.reportDetail}>{item.report}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  reportItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
  },
  reportName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reportDetail: {
    color: '#555',
  },
});

export default ReportsListScreen;
