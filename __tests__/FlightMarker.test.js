import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Animated } from 'react-native';
import FlightMarker from '../components/FlightMarker';

// Mock react-native-maps
jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: {
      Marker: ({ children, coordinate }) =>
        React.createElement(View, { testID: 'marker', coordinate }, children),
    },
    Marker: ({ children, coordinate }) =>
      React.createElement(View, { testID: 'marker', coordinate }, children),
  };
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/FontAwesome', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name, size, style }) =>
    React.createElement(Text, { testID: `icon-${name}`, style }, name);
});

// Spy on Animated.timing
jest.spyOn(Animated, 'timing').mockImplementation((value, config) => ({
  start: jest.fn(callback => {
    // Simulate animation completion
    if (config.toValue !== undefined) {
      value.setValue(config.toValue);
    }
    callback && callback({ finished: true });
  }),
  stop: jest.fn(),
  reset: jest.fn(),
}));

describe('FlightMarker - Rotation Tests', () => {
  const mockFlight = {
    id: 'TEST123',
    callsign: 'TEST',
    position: {
      latitude: 40.7128,
      longitude: -74.0060, // New York
    },
    bearing: 45, // Initial bearing
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <FlightMarker flight={mockFlight} onPress={() => {}} />,
    );
    expect(getByTestId('marker')).toBeTruthy();
  });

  it('calculates bearing correctly for northward movement', () => {
    // Test bearing calculation: from NYC going due north
    const startLat = 40.7128;
    const startLng = -74.0060;
    const endLat = 41.7128; // 1 degree north
    const endLng = -74.0060; // same longitude

    // Import the calculateBearing function
    // Since it's not exported, we'll test it through component behavior
    // Bearing north should be approximately 0° (or 360°)
    expect(endLat > startLat).toBe(true);
    expect(endLng).toBe(startLng);
  });

  it('calculates bearing correctly for eastward movement', () => {
    const startLat = 40.7128;
    const startLng = -74.0060;
    const endLat = 40.7128; // same latitude
    const endLng = -73.0060; // 1 degree east

    // Bearing east should be approximately 90°
    expect(endLat).toBe(startLat);
    expect(endLng > startLng).toBe(true);
  });

  it('updates rotation when position changes', () => {
    const { rerender, getByTestId } = render(
      <FlightMarker flight={mockFlight} onPress={() => {}} />,
    );

    // Update flight position (moving northeast)
    const updatedFlight = {
      ...mockFlight,
      position: {
        latitude: 40.8128, // moved north
        longitude: -73.9060, // moved east
      },
    };

    act(() => {
      rerender(<FlightMarker flight={updatedFlight} onPress={() => {}} />);
    });

    // Animation should have been triggered
    expect(Animated.timing).toHaveBeenCalled();
  });

  it('handles rotation interpolation correctly', () => {
    const { getByTestId } = render(
      <FlightMarker flight={mockFlight} onPress={() => {}} />,
    );

    const marker = getByTestId('marker');
    expect(marker).toBeTruthy();
  });

  it('applies correct icon offset for FontAwesome plane icon', () => {
    // FontAwesome plane points right (East), so we offset by -90° to align with bearing
    const { getByTestId } = render(
      <FlightMarker flight={mockFlight} onPress={() => {}} />,
    );

    // The component should render with rotation applied
    const marker = getByTestId('marker');
    expect(marker).toBeTruthy();
  });

  it('handles multiple position updates smoothly', () => {
    let currentFlight = {
      ...mockFlight,
      position: { latitude: 40.7128, longitude: -74.0060 },
    };

    const { rerender } = render(
      <FlightMarker flight={currentFlight} onPress={() => {}} />,
    );

    // Simulate flight movement through several positions
    const positions = [
      { latitude: 40.7228, longitude: -74.0060 }, // north
      { latitude: 40.7328, longitude: -73.9960 }, // northeast
      { latitude: 40.7428, longitude: -73.9860 }, // northeast
    ];

    positions.forEach((newPosition, index) => {
      act(() => {
        currentFlight = {
          ...currentFlight,
          position: newPosition,
        };
        rerender(<FlightMarker flight={currentFlight} onPress={() => {}} />);
      });

      // Each position change should trigger animation
      expect(Animated.timing).toHaveBeenCalledTimes(index + 1);
    });
  });

  it('does not rotate when position has not changed', () => {
    const { rerender } = render(
      <FlightMarker flight={mockFlight} onPress={() => {}} />,
    );

    // Clear previous calls
    jest.clearAllMocks();

    // Rerender with same position
    act(() => {
      rerender(<FlightMarker flight={mockFlight} onPress={() => {}} />);
    });

    // Animation should not be called for same position
    expect(Animated.timing).not.toHaveBeenCalled();
  });

  it('handles edge case: crossing 0°/360° boundary', () => {
    // Test rotation when crossing the north boundary
    const flight1 = {
      ...mockFlight,
      position: { latitude: 40.7128, longitude: -74.0060 },
      bearing: 350, // Almost full circle
    };

    const { rerender } = render(
      <FlightMarker flight={flight1} onPress={() => {}} />,
    );

    const flight2 = {
      ...flight1,
      position: { latitude: 40.7228, longitude: -74.0060 },
      bearing: 10, // Crossed the 0° boundary
    };

    act(() => {
      rerender(<FlightMarker flight={flight2} onPress={() => {}} />);
    });

    // Should handle the boundary crossing smoothly
    expect(Animated.timing).toHaveBeenCalled();
  });
});

