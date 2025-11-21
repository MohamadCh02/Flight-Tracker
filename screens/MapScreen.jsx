import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import Flights from '../data/dummy_data';

const COLORS = [
  'red',
  'blue',
  'yellow',
  'green',
  'pink',
  'white',
  'brown',
  'orange',
  'purple',
  'cyan',
  'magenta',
];

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {Flights.map((flight, index) => (
          <Polyline
            key={flight.callsign}
            coordinates={flight.coordinates}
            strokeColor={COLORS[index % COLORS.length]}
            strokeWidth={3}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
