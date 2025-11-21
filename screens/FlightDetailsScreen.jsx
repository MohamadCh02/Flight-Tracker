import React from 'react';

import { Text, ScrollView, StyleSheet, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

export default function FlightDetailsScreen(props) {
  const { itemData } = props.route.params;
  const hasPath = Array.isArray(itemData.coordinates);
  const startPoint = hasPath && itemData.coordinates.length > 0
    ? itemData.coordinates[0]
    : { latitude: 48.8566, longitude: 2.3522 };
  const mapRegion = {
    ...startPoint,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.flightCard}>
        <Text style={styles.text}>CallSign: {itemData.callsign}</Text>
        <Text style={styles.text}>
          Origin Country: {itemData.OriginCountry}
        </Text>
        <Text style={styles.text}>
          Destination Country: {itemData.DestinationCountry}
        </Text>
        <Text style={styles.text}>Category: {itemData.category}</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={mapRegion}>
          {hasPath && itemData.coordinates.length > 1 && (
            <Polyline
              coordinates={itemData.coordinates}
              strokeColor="red"
              strokeWidth={3}
            />
          )}
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 16,
  },
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
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },
  map: {
    flex: 1,
  },
});
