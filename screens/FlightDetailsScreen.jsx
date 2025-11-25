import React, { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function FlightDetailsScreen(props) {
  const { itemData } = props.route.params;
  const hasPath = Array.isArray(itemData.coordinates);

  // Live API entries usually have a single current location; keep polyline support
  // for dummy data and future multi-point tracks.
  const fullPath =
    hasPath && itemData.coordinates.length > 0
      ? itemData.coordinates
      : [{ latitude: 48.8566, longitude: 2.3522 }];

  const startPoint = fullPath[0];

  // ---- ANIMATION STATE ----
  const [visiblePath, setVisiblePath] = useState([startPoint]);
  const [index, setIndex] = useState(1);

  // ---- ANIMATE GROWING HIGHLIGHT ----
  useEffect(() => {
    if (!hasPath || fullPath.length <= 1) return;

    if (index >= fullPath.length) return;

    const interval = setInterval(() => {
      setVisiblePath(prev => [...prev, fullPath[index]]);
      setIndex(i => i + 1);
    }, 6000); // speed of highlight animation

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, fullPath]);

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
          {startPoint && (
            <Marker
              coordinate={startPoint}
              title={itemData.callsign}
              description={`Origin: ${itemData.OriginCountry || 'Unknown'}`}
            />
          )}

          {/* 1️⃣ Faint full route */}
          {hasPath && fullPath.length > 1 && (
            <Polyline
              coordinates={fullPath}
              strokeColor="rgba(255,255,255,0.3)"
              strokeWidth={4}
            />
          )}

          {/* 2️⃣ Highlight animated route */}
          {visiblePath.length > 1 && (
            <Polyline
              coordinates={visiblePath}
              strokeColor="red"
              strokeWidth={5}
              lineCap="round"
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
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    width: 300,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },

  text: { color: 'black', textAlign: 'center' },

  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: { flex: 1 },
});
