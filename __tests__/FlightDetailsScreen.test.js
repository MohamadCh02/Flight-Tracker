import React from 'react';
import { render, act } from '@testing-library/react-native';
import FlightDetailsScreen from '../screens/FlightDetailsScreen';
import Flights from '../data/dummy_data';

jest.useFakeTimers();

describe('FlightDetailsScreen', () => {
  it('displays the correct flight details', () => {
    const route = {
      params: {
        id: 'BAW908',
      },
    };
    const { getByText } = render(<FlightDetailsScreen route={route} />);
    const expectedFlight = Flights.find((flight) => flight.id === 'BAW908');

    expect(getByText(expectedFlight.callsign)).toBeDefined();
    expect(
      getByText(
        `${expectedFlight.OriginCountry} to ${expectedFlight.DestinationCountry}`,
      ),
    ).toBeDefined();
  });
});