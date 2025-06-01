import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';

export default function IPInfoScreen() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIpData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://api.ipquery.io/?format=json');
      if (!response.ok) throw new Error('Erro ao buscar dados do IP');

      const data = await response.json();
      setIpData(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando informações do IP...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Content>
          <Title>Informações do IP</Title>
          <Paragraph><Text style={styles.label}>País:</Text> {ipData.location?.country} ({ipData.location?.country_code})</Paragraph>
          <Paragraph><Text style={styles.label}>Região:</Text> {ipData.location?.state}</Paragraph>
          <Paragraph><Text style={styles.label}>Cidade:</Text> {ipData.location?.city}</Paragraph>
          <Paragraph><Text style={styles.label}>Código Postal:</Text> {ipData.location?.zipcode || 'Não informado'}</Paragraph>
          <Paragraph><Text style={styles.label}>Latitude:</Text> {ipData.location?.latitude}</Paragraph>
          <Paragraph><Text style={styles.label}>Longitude:</Text> {ipData.location?.longitude}</Paragraph>
          <Paragraph><Text style={styles.label}>ASN:</Text> {ipData.isp?.asn}</Paragraph>
          <Paragraph><Text style={styles.label}>Organização:</Text> {ipData.isp?.org}</Paragraph>
          <Paragraph><Text style={styles.label}>ISP:</Text> {ipData.isp?.isp}</Paragraph>
          <Paragraph>
            <Text style={styles.label}>VPN Detectada:</Text> {ipData.risk?.is_vpn ? 'Sim' : 'Não'}
          </Paragraph>

        </Card.Content>
      </Card>
    </ScrollView>
  );
  
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
});
