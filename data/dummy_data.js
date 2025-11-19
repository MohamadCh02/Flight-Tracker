import Flight from '../models/Flight';

export const Flights = [
  new Flight('AFR123', 'France', 'Germany', 'Commercial'),
  new Flight('DLH452', 'Germany', 'USA', 'Commercial'),
  new Flight('BAW908', 'United Kingdom', 'France', 'Commercial'),
  new Flight('UAE215', 'United Arab Emirates', 'Australia', 'Commercial'),
  new Flight('QFA12', 'Australia', 'USA', 'Commercial'),
  new Flight('RYR88T', 'Ireland', 'Spain', 'Low-cost'),
  new Flight('EZY401', 'United Kingdom', 'Italy', 'Low-cost'),
  new Flight('SIA26', 'Singapore', 'USA', 'Commercial'),
  new Flight('KLM789', 'Netherlands', 'Brazil', 'Commercial'),
  new Flight('JAL62', 'Japan', 'USA', 'Commercial'),
  new Flight('TAP93', 'Portugal', 'France', 'Commercial'),
  new Flight('AAL77', 'USA', 'Mexico', 'Commercial'),
  new Flight('VLG325', 'Spain', 'Germany', 'Low-cost'),
  new Flight('SWR18', 'Switzerland', 'United Kingdom', 'Commercial'),
  new Flight('THY5M', 'Turkey', 'France', 'Commercial'),
  new Flight('ETH703', 'Ethiopia', 'China', 'Commercial'),
  new Flight('ANA212', 'Japan', 'Singapore', 'Commercial'),
  new Flight('WZZ220', 'Hungary', 'Poland', 'Low-cost'),
  new Flight('CPA902', 'Hong Kong', 'Canada', 'Cargo'),
  new Flight('FDX45', 'USA', 'Belgium', 'Cargo'),
];

export const dummyTrajectory = [
  { latitude: 48.8566, longitude: 2.3522 }, // Paris
  { latitude: 50.1109, longitude: 8.6821 }, // Frankfurt
  { latitude: 52.52, longitude: 13.405 }, // Berlin
  { latitude: 52.2297, longitude: 21.0122 }, // Warsaw
  { latitude: 50.4501, longitude: 30.5234 }, // Kyiv
  { latitude: 55.7558, longitude: 37.6176 }, // Moscow
];
