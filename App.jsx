import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Flight from './components/Flight';

export default function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlights = async () => {
    try {
      const response = await fetch(
        'https://opensky-network.org/api/states/all',
      );
      const data = await response.json();
      setFlights(data.states || []);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  if (loading) return <Text style={styles.text}>Loading flight data...</Text>;

  return (
    <ScrollView style={styles.container}>
      {flights.slice(0, 5).map((flight, index) => (
        <View key={index} style={styles.flightCard}>
          <Text style={styles.text}>Callsign: {flight[1] || 'N/A'}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111', marginTop: 70 },
  flightCard: {
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    width: 300,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: { color: 'Black' },
});
