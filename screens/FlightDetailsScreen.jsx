import React, { useContext, useState } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { FlightContext } from '../components/FlightContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FlightDetailsScreen(props) {
  const { itemData } = props.route.params;
  const { flights } = useContext(FlightContext);
  const flight = flights.find(f => f.id === itemData.id);

  const mapRegion = {
    latitude: flight.position.latitude,
    longitude: flight.position.longitude,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  const [showTrajectory, setShowTrajectory] = useState(false);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      bounces={false}
    >
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.callsign}>{flight.callsign}</Text>
          <Text style={styles.routeLabel}>
            {flight.OriginCountry} → {flight.DestinationCountry}
          </Text>
          <Text style={styles.category}>{flight.category}</Text>
        </View>
        <View style={styles.iconBadge}>
          <Ionicons name="navigate" size={22} color="#4DD7FF" />
        </View>
      </View>

      <View style={styles.infoRow}>
       
        <View style={styles.pill}>
          <Ionicons name="git-branch-outline" size={14} color="#4DD7FF" />
          <Text style={styles.pillText}>{flight.coordinates.length} waypoints</Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          onPress={() => setShowTrajectory(false)}
          showsCompass
          pitchEnabled={false}
        >
          <Marker
            coordinate={flight.position}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={e => {
              if (e?.stopPropagation) {
                e.stopPropagation();
              }
              setShowTrajectory(current => !current);
            }}
          >
            <Icon testID="plane-icon" name="plane" size={40} color="#F5F7FB" />
          </Marker>

          {showTrajectory && (
            <Polyline
              coordinates={flight.coordinates}
              strokeColor="rgba(77, 215, 255, 0.9)"
              strokeWidth={4}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => setShowTrajectory(current => !current)}
        >
          <Ionicons
            name={showTrajectory ? 'eye-off-outline' : 'eye-outline'}
            size={16}
            color="#0B1220"
          />
          <Text style={styles.toggleText}>
            {showTrajectory ? 'Hide trajectory' : 'Show trajectory'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0B1220',
  },
  content: {
    padding: 20,
    minHeight: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#151C2D',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 14,
  },
  callsign: {
    color: '#F5F7FB',
    fontSize: 20,
    fontWeight: '800',
  },
  routeLabel: {
    color: '#9BA3B5',
    marginTop: 4,
    fontSize: 14,
  },
  category: {
    color: '#4DD7FF',
    marginTop: 6,
    fontSize: 13,
  },
  iconBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(77,215,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(77,215,255,0.35)',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151C2D',
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  pillText: {
    color: '#F5F7FB',
    marginLeft: 8,
    fontSize: 12,
  },
  mapContainer: {
    height: 340,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#0F1828',
  },
  map: { flex: 1 },
  toggle: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#4DD7FF',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toggleText: {
    color: '#0B1220',
    fontWeight: '700',
    fontSize: 12,
  },
});
