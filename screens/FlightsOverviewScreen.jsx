import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Flights from '../data/dummy_data';

export default function FlightOverviewScreen(props) {
  // const [flights, setFlights] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const credentials = Buffer.from('Kelsier:YY4Ch5~63!C9gkw').toString('base64');

  // const fetchFlights = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://opensky-network.org/api/states/all',
  //       {
  //         headers: {
  //           Authorization: 'Basic ${credentials}',
  //         },
  //       },
  //     );
  //     const data = await response.json();
  //     setFlights(data.states || []);
  //   } catch (error) {
  //     console.error('Error fetching flight data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchFlights();
  // }, []);

  // if (loading) return <Text style={styles.text}>Loading flights</Text>;

  return (
    <FlatList
      style={styles.container}
      data={Flights}
      keyExtractor={item => item.callsign}
      renderItem={({ item }) => (
        <View style={styles.flightCard}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Details', { itemData: item });
              }}
            >
              <Text style={styles.text}>{item.callsign}</Text>
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
});
