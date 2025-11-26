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
    <Stack.Navigator>
      <Stack.Screen
        name="Flights Overview"
        component={FlightOverviewScreen}
        options={{ Title: 'Flights' }}
      />
      <Stack.Screen
        name="Details"
        component={FlightDetailsScreen}
        options={{ Titel: 'Details' }}
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
        })}
      >
        <Tab.Screen
          name="Home"
          component={FlightDetailsNavigater}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
