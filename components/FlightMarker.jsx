import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

const toRad = deg => (deg * Math.PI) / 180;
const toDeg = rad => (rad * 180) / Math.PI;
const calculateBearing = (lat1, lon1, lat2, lon2) => {
  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.cos(toRad(lon2 - lon1));
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
};

const FlightMarker = ({ flight, onPress, color }) => {
  if (!flight || !flight.position) return null;

  // Aim toward the final waypoint so the nose points at the destination country.
  const destinationBearing = (() => {
    const coords = flight.coordinates || [];
    if (coords.length === 0) return flight.bearing || 0;
    const last = coords[coords.length - 1];
    return calculateBearing(
      flight.position.latitude,
      flight.position.longitude,
      last.latitude,
      last.longitude,
    );
  })();

  return (
    <Marker
      coordinate={flight.position}
      anchor={{ x: 0.5, y: 0.5 }}
      flat={true}
      rotation={destinationBearing}
      onPress={(e) => {
        e.stopPropagation();
        onPress && onPress();
      }}
    >
      <View style={{  width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="plane" size={26} style={[styles.plane, color && { color }]} />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  plane: {
    color: '#ff3b30',
    marginTop: 0,
    marginLeft: 0,
  },
});

export default FlightMarker;