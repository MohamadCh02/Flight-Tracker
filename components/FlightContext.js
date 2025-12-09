import React, { createContext, useState, useEffect, useRef } from 'react';
import FLIGHTS from '../data/dummy_data';

export const FlightContext = createContext();

function getBearing(lat1, lon1, lat2, lon2) {
  const toRadians = deg => deg * (Math.PI / 180);
  const toDegrees = rad => rad * (180 / Math.PI);

  const y = Math.sin(toRadians(lon2 - lon1)) * Math.cos(toRadians(lat2));
  const x =
    Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
    Math.sin(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.cos(toRadians(lon2 - lon1));
  const bearing = toDegrees(Math.atan2(y, x));
  return (bearing + 360) % 360;
}

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState(
    FLIGHTS.map(flight => ({
      ...flight,
      position: flight.coordinates[0],
      bearing:
        flight.coordinates.length > 1
          ? getBearing(
              flight.coordinates[0].latitude,
              flight.coordinates[0].longitude,
              flight.coordinates[1].latitude,
              flight.coordinates[1].longitude,
            )
          : 0,
      pathIndex: 1,
    })),
  );

  // Which flight's trajectory (if any) is currently highlighted
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFlights(prevFlights =>
        prevFlights.map(flight => {
          if (flight.pathIndex >= flight.coordinates.length) {
            return flight;
          }

          const nextPosition = flight.coordinates[flight.pathIndex];
          const newBearing = getBearing(
            flight.position.latitude,
            flight.position.longitude,
            nextPosition.latitude,
            nextPosition.longitude,
          );

          return {
            ...flight,
            position: nextPosition,
            bearing: newBearing,
            pathIndex: flight.pathIndex + 1,
          };
        }),
      );
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <FlightContext.Provider
      value={{
        flights,
        selectedFlightId,
        setSelectedFlightId,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
