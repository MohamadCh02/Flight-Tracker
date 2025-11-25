import React, { useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function FlightOverviewScreen(props) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlights = async () => {
    try {
      const response = await fetch(
        'https://opensky-network.org/api/states/all',
      );
      const data = await response.json();

      const parsedFlights = (data?.states || [])
        .map((state, index) => {
          if (!state) return null;

          const icao24 = state[0];
          const rawCallsign = state[1]?.trim();
          const callsign = rawCallsign || icao24 || `flight-${index}`;
          const originCountry = state[2] || 'Unknown';
          const longitude = state[5];
          const latitude = state[6];

          const coordinates =
            latitude != null && longitude != null
              ? [{ latitude, longitude }]
              : [];

          return {
            id: `${icao24 || callsign}-${index}`,
            callsign,
            OriginCountry: originCountry,
            DestinationCountry: 'Unknown',
            category: 'Live flight',
            coordinates,
          };
        })
        .filter(Boolean);

      setFlights(parsedFlights);
    } catch (err) {
      console.error('Error fetching flight data:', err);
      setError('Unable to load flights right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  if (loading) return <Text style={styles.text}>Loading flights</Text>;

  if (error)
    return (
      <View style={styles.centeredMessage}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );

  if (!flights.length)
    return (
      <View style={styles.centeredMessage}>
        <Text style={styles.text}>No flights found</Text>
      </View>
    );

  return (
    <FlatList
      style={styles.container}
      data={flights.slice(0, 20)}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.flightCard}>
          <ScrollView key={item.id}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Details', { itemData: item });
              }}
            >
              <Text style={styles.text}>Callsign: {item.callsign}</Text>
              <Text style={styles.text}>Origin: {item.OriginCountry}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#111',
    marginTop: 70,
  },
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
    alignSelf: 'center',
  },
  text: { color: 'Black', textAlign: 'center' },
  centeredMessage: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
