import Flight from '../models/Flight';

const Flights = [
  new Flight('AFR123', 'France', 'Germany', 'Commercial', [
    { latitude: 48.8566, longitude: 2.3522 },
    { latitude: 49.0097, longitude: 2.5479 },
    { latitude: 49.7745, longitude: 4.7184 },
    { latitude: 50.9375, longitude: 6.9603 },
    { latitude: 51.1657, longitude: 10.4515 },
    { latitude: 52.3759, longitude: 9.732 },
    { latitude: 52.52, longitude: 13.405 },
  ]),

  new Flight('DLH452', 'Germany', 'USA', 'Commercial', [
    { latitude: 52.52, longitude: 13.405 },
    { latitude: 53.0, longitude: 10.0 },
    { latitude: 55.0, longitude: -10.0 },
    { latitude: 50.0, longitude: -40.0 },
    { latitude: 40.0, longitude: -60.0 },
    { latitude: 41.9773, longitude: -87.908 }, // Chicago (dummy US entry)
  ]),

  new Flight('BAW908', 'United Kingdom', 'France', 'Commercial', [
    { latitude: 51.5074, longitude: -0.1278 },
    { latitude: 50.9, longitude: 1.0 },
    { latitude: 49.5, longitude: 1.5 },
    { latitude: 48.8566, longitude: 2.3522 },
  ]),

  new Flight('UAE215', 'United Arab Emirates', 'Australia', 'Commercial', [
    { latitude: 25.2048, longitude: 55.2708 },
    { latitude: 10.0, longitude: 80.0 },
    { latitude: -10.0, longitude: 110.0 },
    { latitude: -25.2744, longitude: 133.7751 },
  ]),

  new Flight('QFA12', 'Australia', 'USA', 'Commercial', [
    { latitude: -33.8688, longitude: 151.2093 },
    { latitude: -20.0, longitude: 170.0 },
    { latitude: 0.0, longitude: -160.0 },
    { latitude: 25.0, longitude: -130.0 },
    { latitude: 34.0522, longitude: -118.2437 },
  ]),

  new Flight('RYR88T', 'Ireland', 'Spain', 'Low-cost', [
    { latitude: 53.3498, longitude: -6.2603 },
    { latitude: 50.0, longitude: -3.0 },
    { latitude: 45.0, longitude: -1.0 },
    { latitude: 40.4168, longitude: -3.7038 },
  ]),

  new Flight('EZY401', 'United Kingdom', 'Italy', 'Low-cost', [
    { latitude: 51.5074, longitude: -0.1278 },
    { latitude: 48.8566, longitude: 2.3522 },
    { latitude: 46.0, longitude: 7.0 },
    { latitude: 45.4642, longitude: 9.19 },
  ]),

  new Flight('SIA26', 'Singapore', 'USA', 'Commercial', [
    { latitude: 1.3521, longitude: 103.8198 },
    { latitude: 20.0, longitude: 150.0 },
    { latitude: 30.0, longitude: 170.0 },
    { latitude: 37.7749, longitude: -122.4194 },
  ]),

  new Flight('KLM789', 'Netherlands', 'Brazil', 'Commercial', [
    { latitude: 52.3676, longitude: 4.9041 },
    { latitude: 40.0, longitude: -10.0 },
    { latitude: 10.0, longitude: -30.0 },
    { latitude: -15.7942, longitude: -47.8822 },
  ]),

  new Flight('JAL62', 'Japan', 'USA', 'Commercial', [
    { latitude: 35.6895, longitude: 139.6917 },
    { latitude: 45.0, longitude: 160.0 },
    { latitude: 50.0, longitude: -170.0 },
    { latitude: 47.6062, longitude: -122.3321 },
  ]),

  new Flight('TAP93', 'Portugal', 'France', 'Commercial', [
    { latitude: 38.7223, longitude: -9.1393 },
    { latitude: 40.0, longitude: -5.0 },
    { latitude: 45.0, longitude: 0.0 },
    { latitude: 48.8566, longitude: 2.3522 },
  ]),

  new Flight('AAL77', 'USA', 'Mexico', 'Commercial', [
    { latitude: 34.0522, longitude: -118.2437 },
    { latitude: 30.0, longitude: -115.0 },
    { latitude: 25.0, longitude: -110.0 },
    { latitude: 19.4326, longitude: -99.1332 },
  ]),

  new Flight('VLG325', 'Spain', 'Germany', 'Low-cost', [
    { latitude: 40.4168, longitude: -3.7038 },
    { latitude: 45.0, longitude: 2.0 },
    { latitude: 50.0, longitude: 8.0 },
    { latitude: 52.52, longitude: 13.405 },
  ]),

  new Flight('SWR18', 'Switzerland', 'United Kingdom', 'Commercial', [
    { latitude: 47.3769, longitude: 8.5417 },
    { latitude: 50.0, longitude: 6.0 },
    { latitude: 52.0, longitude: 2.0 },
    { latitude: 51.5074, longitude: -0.1278 },
  ]),

  new Flight('THY5M', 'Turkey', 'France', 'Commercial', [
    { latitude: 41.0082, longitude: 28.9784 },
    { latitude: 45.0, longitude: 25.0 },
    { latitude: 47.0, longitude: 10.0 },
    { latitude: 48.8566, longitude: 2.3522 },
  ]),

  new Flight('ETH703', 'Ethiopia', 'China', 'Commercial', [
    { latitude: 9.03, longitude: 38.74 },
    { latitude: 20.0, longitude: 60.0 },
    { latitude: 30.0, longitude: 80.0 },
    { latitude: 39.9042, longitude: 116.4074 },
  ]),

  new Flight('ANA212', 'Japan', 'Singapore', 'Commercial', [
    { latitude: 35.6762, longitude: 139.6503 },
    { latitude: 25.0, longitude: 135.0 },
    { latitude: 10.0, longitude: 115.0 },
    { latitude: 1.3521, longitude: 103.8198 },
  ]),

  new Flight('WZZ220', 'Hungary', 'Poland', 'Low-cost', [
    { latitude: 47.4979, longitude: 19.0402 },
    { latitude: 49.5, longitude: 20.0 },
    { latitude: 51.0, longitude: 20.5 },
    { latitude: 52.2297, longitude: 21.0122 },
  ]),

  new Flight('CPA902', 'Hong Kong', 'Canada', 'Cargo', [
    { latitude: 22.3193, longitude: 114.1694 },
    { latitude: 40.0, longitude: 170.0 },
    { latitude: 55.0, longitude: -150.0 },
    { latitude: 49.2827, longitude: -123.1207 },
  ]),

  new Flight('FDX45', 'USA', 'Belgium', 'Cargo', [
    { latitude: 34.0522, longitude: -118.2437 },
    { latitude: 45.0, longitude: -50.0 },
    { latitude: 50.0, longitude: -10.0 },
    { latitude: 50.8503, longitude: 4.3517 },
  ]),
];

export default Flights;
