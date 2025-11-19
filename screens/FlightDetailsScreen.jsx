import React from 'react';

import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FlightDetailsScreen(props) {
  const { itemData } = props.route.params;

  return (
    <View style={styles.flightCard}>
      <Text style={styles.text}>CallSign: {itemData.callsign}</Text>
      <Text style={styles.text}>Origin Country: {itemData.OriginCountry}</Text>
      <Text style={styles.text}>
        Destination Country: {itemData.DestinationCountry}
      </Text>
      <Text style={styles.text}>Category: {itemData.category}</Text>
    </View>
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
  text: { color: 'Black', textAlign: 'center' },
});
