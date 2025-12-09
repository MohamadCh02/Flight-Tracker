// Jest setup file
// Mock react-native-reanimated if available
try {
  jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => {};
    return Reanimated;
  });
} catch (e) {
  // Ignore if not available
}

