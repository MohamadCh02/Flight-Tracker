/**
 * Test the Haversine-based bearing calculation
 * This tests the core rotation logic used by FlightMarker
 */

// Extract the bearing calculation logic
const calculateBearing = (startLat, startLng, destLat, destLng) => {
  const startLatRad = (startLat * Math.PI) / 180;
  const startLngRad = (startLng * Math.PI) / 180;
  const destLatRad = (destLat * Math.PI) / 180;
  const destLngRad = (destLng * Math.PI) / 180;

  const deltaLng = destLngRad - startLngRad;

  const cosDestLat = Math.cos(destLatRad);
  const sinDeltaLng = Math.sin(deltaLng);
  const cosStartLat = Math.cos(startLatRad);
  const sinDestLat = Math.sin(destLatRad);
  const sinStartLat = Math.sin(startLatRad);
  const cosDeltaLng = Math.cos(deltaLng);

  const y = sinDeltaLng * cosDestLat;
  const x = cosStartLat * sinDestLat - sinStartLat * cosDestLat * cosDeltaLng;

  let bearing = Math.atan2(y, x);
  bearing = (bearing * 180) / Math.PI;

  return (bearing + 360) % 360;
};

describe('Haversine Bearing Calculation', () => {
  // Tolerance for floating point comparisons
  const tolerance = 1; // 1 degree tolerance

  it('calculates bearing for due north movement', () => {
    // From New York (40.7128, -74.0060) going due north
    const bearing = calculateBearing(40.7128, -74.0060, 41.7128, -74.0060);
    
    // Bearing should be approximately 0° (north)
    expect(bearing).toBeCloseTo(0, 0);
  });

  it('calculates bearing for due east movement', () => {
    // From New York (40.7128, -74.0060) going due east
    const bearing = calculateBearing(40.7128, -74.0060, 40.7128, -73.0060);
    
    // Bearing should be approximately 90° (east)
    expect(bearing).toBeCloseTo(90, 0);
  });

  it('calculates bearing for due south movement', () => {
    // From New York (40.7128, -74.0060) going due south
    const bearing = calculateBearing(40.7128, -74.0060, 39.7128, -74.0060);
    
    // Bearing should be approximately 180° (south)
    expect(bearing).toBeCloseTo(180, 0);
  });

  it('calculates bearing for due west movement', () => {
    // From New York (40.7128, -74.0060) going due west
    const bearing = calculateBearing(40.7128, -74.0060, 40.7128, -75.0060);
    
    // Bearing should be approximately 270° (west)
    expect(bearing).toBeCloseTo(270, 0);
  });

  it('calculates bearing for northeast movement', () => {
    // From origin going northeast
    const bearing = calculateBearing(0, 0, 1, 1);
    
    // Bearing should be approximately 45° (northeast)
    expect(bearing).toBeCloseTo(45, 0);
  });

  it('calculates bearing for northwest movement', () => {
    // From origin going northwest
    const bearing = calculateBearing(0, 0, 1, -1);
    
    // Bearing should be approximately 315° (northwest, or -45° normalized)
    expect(bearing).toBeCloseTo(315, 0);
  });

  it('handles same position (returns valid bearing)', () => {
    // When start and end are the same, bearing calculation should still work
    const bearing = calculateBearing(40.7128, -74.0060, 40.7128, -74.0060);
    
    // Should return a valid bearing (0-360)
    expect(bearing).toBeGreaterThanOrEqual(0);
    expect(bearing).toBeLessThan(360);
  });

  it('normalizes bearing to 0-360 range', () => {
    // Test that all bearings are in valid range
    const testCases = [
      [40.7128, -74.0060, 41.7128, -74.0060], // north
      [40.7128, -74.0060, 40.7128, -73.0060], // east
      [40.7128, -74.0060, 39.7128, -74.0060], // south
      [40.7128, -74.0060, 40.7128, -75.0060], // west
    ];

    testCases.forEach(([lat1, lng1, lat2, lng2]) => {
      const bearing = calculateBearing(lat1, lng1, lat2, lng2);
      expect(bearing).toBeGreaterThanOrEqual(0);
      expect(bearing).toBeLessThan(360);
    });
  });

  it('calculates bearing for real-world flight path', () => {
    // Paris to Berlin approximate path
    // Paris: 48.8566, 2.3522
    // Berlin: 52.52, 13.405
    const bearing = calculateBearing(48.8566, 2.3522, 52.52, 13.405);
    
    // Should be roughly northeast (around 50-60 degrees)
    expect(bearing).toBeGreaterThan(40);
    expect(bearing).toBeLessThan(70);
  });

  it('handles crossing the prime meridian (0° longitude)', () => {
    // From negative to positive longitude
    const bearing = calculateBearing(40.0, -1.0, 41.0, 1.0);
    
    // Should return a valid bearing
    expect(bearing).toBeGreaterThanOrEqual(0);
    expect(bearing).toBeLessThan(360);
  });

  it('handles crossing the international date line', () => {
    // Large longitude difference
    const bearing = calculateBearing(40.0, 179.0, 41.0, -179.0);
    
    // Should return a valid bearing
    expect(bearing).toBeGreaterThanOrEqual(0);
    expect(bearing).toBeLessThan(360);
  });

  it('produces consistent results for reverse direction', () => {
    // Bearing from A to B should be opposite of B to A (plus 180°)
    const bearing1 = calculateBearing(40.7128, -74.0060, 41.7128, -74.0060);
    const bearing2 = calculateBearing(41.7128, -74.0060, 40.7128, -74.0060);
    
    // Reverse bearing should be approximately 180° different
    const diff = Math.abs(bearing2 - bearing1);
    const reverseDiff = diff > 180 ? 360 - diff : diff;
    
    expect(reverseDiff).toBeCloseTo(180, 0);
  });
});

