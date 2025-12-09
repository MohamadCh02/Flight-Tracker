import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { FlightContext } from '../components/FlightContext';
import FlightMarker from '../components/FlightMarker';

const palette = {
  background: '#0B1220',
  overlay: '#151C2D',
  accent: '#4DD7FF',
  textPrimary: '#F5F7FB',
  textSecondary: '#9BA3B5',
};

export default function MapScreen() {
  const { flights, selectedFlightId, setSelectedFlightId } =
    useContext(FlightContext);

  const selectedFlight = flights.find(f => f.id === selectedFlightId);

  const colors = ['#ff3b30', '#34c759', '#0a84ff', '#ff9500', '#af52de'];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20,
          longitude: 0,
          latitudeDelta: 120,
          longitudeDelta: 120,
        }}
        onPress={() => setSelectedFlightId(null)}
        showsCompass
      >
        {flights.map((flight, index) => (
          <FlightMarker
            key={flight.callsign}
            flight={flight}
            color={colors[index % colors.length]}
            onPress={() =>
              setSelectedFlightId(current =>
                current === flight.id ? null : flight.id,
              )
            }
          />
        ))}

        {selectedFlight && (
          <Polyline
            coordinates={selectedFlight.coordinates}
            strokeColor="rgba(77, 215, 255, 0.9)"
            strokeWidth={4}
          />
        )}
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.overlayTitle}>Live flights</Text>
        <Text style={styles.overlaySubtitle}>
          Tap a plane to highlight its trajectory
        </Text>
        {selectedFlight && (
          <View style={styles.selectedCard}>
            <Text style={styles.selectedTitle}>{selectedFlight.callsign}</Text>
            <Text style={styles.selectedRoute}>
              {selectedFlight.OriginCountry} → {selectedFlight.DestinationCountry}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.background },
  map: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 18,
    left: 16,
    right: 16,
    backgroundColor: palette.overlay,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  overlayTitle: {
    color: palette.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  overlaySubtitle: {
    color: palette.textSecondary,
    marginTop: 4,
    fontSize: 12,
  },
  selectedCard: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#0F1828',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  selectedTitle: {
    color: palette.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  selectedRoute: {
    color: palette.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
});
