import MapView, { Polyline } from 'react-native-maps';

const flightCoordinates = [
  { latitude: 37.78825, longitude: -122.4324 }, // Origin
  { latitude: 34.05223, longitude: -118.24368 }, // Destination
  // ... intermediate points if needed
];

<MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
  <Polyline
    coordinates={flightCoordinates}
    strokeColor="#000" // black
    strokeWidth={3}
  />
</MapView>;
