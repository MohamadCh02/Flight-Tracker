import React, { useContext, useMemo, useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlightContext } from '../components/FlightContext';

const palette = {
  background: '#0B1220',
  card: '#151C2D',
  accent: '#4DD7FF',
  textPrimary: '#F5F7FB',
  textSecondary: '#9BA3B5',
  border: 'rgba(255,255,255,0.08)',
};

export default function FlightOverviewScreen(props) {
  const { flights } = useContext(FlightContext);
  const [query, setQuery] = useState('');

  const enrichedFlights = useMemo(
    () =>
      flights.map(flight => ({
        ...flight,
        routeLabel: `${flight.OriginCountry} → ${flight.DestinationCountry}`,
      })),
    [flights],
  );

  const filteredFlights = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enrichedFlights;
    return enrichedFlights.filter(f =>
      [f.OriginCountry, f.DestinationCountry].some(country =>
        (country || '').toLowerCase().includes(q),
      ),
    );
  }, [enrichedFlights, query]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={palette.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by origin or destination"
          placeholderTextColor={palette.textSecondary}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="words"
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={palette.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={filteredFlights}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.flightCard}
            onPress={() =>
              props.navigation.navigate('Details', { itemData: { id: item.id } })
            }
          >
            <View style={styles.row}>
              <View style={styles.iconCircle}>
                <Ionicons name="airplane" size={18} color={palette.accent} />
              </View>
              <View style={styles.textColumn}>
                <Text style={styles.callsign}>{item.callsign}</Text>
                <Text style={styles.route}>{item.routeLabel}</Text>
                <Text style={styles.meta}>
                  {item.category} • {item.coordinates.length} waypoints
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={palette.textSecondary} />
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={22} color={palette.textSecondary} />
            <Text style={styles.emptyText}>No flights match your search.</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingTop: 24,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: palette.textPrimary,
    paddingVertical: 0,
    fontSize: 14,
  },
  flightCard: {
    backgroundColor: palette.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(77,215,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textColumn: {
    flex: 1,
  },
  callsign: {
    color: palette.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  route: {
    color: palette.textSecondary,
    marginTop: 2,
    fontSize: 13,
  },
  meta: {
    color: palette.accent,
    marginTop: 6,
    fontSize: 12,
  },
  separator: {
    height: 12,
  },
  emptyState: {
    paddingVertical: 32,
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    color: palette.textSecondary,
    fontSize: 13,
  },
});
