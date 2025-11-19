const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { resolve } = require('metro-resolver');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest(context, moduleName, platform) {
      if (
        (moduleName === './decorateMapComponent' ||
          moduleName === './decorateMapComponent.ts') &&
        context.originModulePath?.includes(
          `${path.sep}react-native-maps${path.sep}src${path.sep}`,
        )
      ) {
        return {
          type: 'sourceFile',
          filePath: path.resolve(
            __dirname,
            'patches/react-native-maps/src/decorateMapComponent.ts',
          ),
        };
      }

      return resolve(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
