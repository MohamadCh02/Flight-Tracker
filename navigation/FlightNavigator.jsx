import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FlightOverviewScreen from '../screens/FlightsOverviewScreen';
import FlightDetailsScreen from '../screens/FlightDetailsScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function FlightDetailsNavigater() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0B1220' },
        headerTintColor: '#F5F7FB',
        headerTitleStyle: { fontWeight: '800' },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Flights Overview"
        component={FlightOverviewScreen}
        options={{ title: 'Flights' }}
      />
      <Stack.Screen
        name="Details"
        component={FlightDetailsScreen}
        options={{ title: 'Flight details' }}
      />
    </Stack.Navigator>
  );
}

export default function TabNabigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName = route.name === 'Home' ? 'home' : 'map';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: '#4DD7FF',
          tabBarInactiveTintColor: '#9BA3B5',
          tabBarStyle: {
            backgroundColor: '#0B1220',
            borderTopColor: 'rgba(255,255,255,0.08)',
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={FlightDetailsNavigater}
        />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
