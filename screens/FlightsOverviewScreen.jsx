import React from 'react';

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
  const flights = Flights;

  return (
    <FlatList
      style={styles.container}
      data={flights}
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
