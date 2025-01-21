import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportDetailScreen = ({ route }) => {
  const { report } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{report.name}</Text>
      <Text style={styles.detail}>ID: {report.id}</Text>
      <Text style={styles.detail}>Reporte: {report.report}</Text>
    </View>
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
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ReportDetailScreen;
