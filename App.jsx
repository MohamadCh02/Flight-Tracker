import React from 'react';
import FlightDetailsNavigater from './navigation/FlightNavigator';
import { FlightProvider } from './components/FlightContext';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <FlightProvider>
      <StatusBar hidden />
      <FlightDetailsNavigater />
    </FlightProvider>
  );
}
