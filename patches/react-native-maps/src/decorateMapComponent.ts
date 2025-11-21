import {createContext} from 'react';
import {
  requireNativeComponent,
  NativeModules,
  Platform,
  UIManager,
  type HostComponent,
} from 'react-native';
import {PROVIDER_DEFAULT, PROVIDER_GOOGLE} from '../../../node_modules/react-native-maps/src/ProviderConstants';
import type {Provider} from '../../../node_modules/react-native-maps/src/sharedTypes';
import type {MapCallout} from '../../../node_modules/react-native-maps/src/MapCallout';
import type {MapOverlay} from '../../../node_modules/react-native-maps/src/MapOverlay';
import type {MapCalloutSubview} from '../../../node_modules/react-native-maps/src/MapCalloutSubview';
import type {MapCircle} from '../../../node_modules/react-native-maps/src/MapCircle';
import type {MapHeatmap} from '../../../node_modules/react-native-maps/src/MapHeatmap';
import type {MapLocalTile} from '../../../node_modules/react-native-maps/src/MapLocalTile';
import type {MapMarker} from '../../../node_modules/react-native-maps/src/MapMarker';
import type {MapPolygon} from '../../../node_modules/react-native-maps/src/MapPolygon';
import type {MapPolyline} from '../../../node_modules/react-native-maps/src/MapPolyline';
import type {MapUrlTile} from '../../../node_modules/react-native-maps/src/MapUrlTile';
import type {MapWMSTile} from '../../../node_modules/react-native-maps/src/MapWMSTile';
import {Commands} from '../../../node_modules/react-native-maps/src/MapViewNativeComponent';
import GooglePolygon from '../../../node_modules/react-native-maps/src/specs/NativeComponentGooglePolygon';
import FabricMarker from '../../../node_modules/react-native-maps/src/specs/NativeComponentMarker';
import FabricUrlTile from '../../../node_modules/react-native-maps/src/specs/NativeComponentUrlTile';
import FabricWMSTile from '../../../node_modules/react-native-maps/src/specs/NativeComponentWMSTile';
import FabricCallout from '../../../node_modules/react-native-maps/src/specs/NativeComponentCallout';
import FabricPolyline from '../../../node_modules/react-native-maps/src/specs/NativeComponentPolyline';
import FabricCircle from '../../../node_modules/react-native-maps/src/specs/NativeComponentCircle';
import FabricOverlay from '../../../node_modules/react-native-maps/src/specs/NativeComponentOverlay';

export const SUPPORTED: ImplementationStatus = 'SUPPORTED';
export const USES_DEFAULT_IMPLEMENTATION: ImplementationStatus =
  'USES_DEFAULT_IMPLEMENTATION';
export const NOT_SUPPORTED: ImplementationStatus = 'NOT_SUPPORTED';

export const ProviderContext = createContext<Provider>(undefined);

export function getNativeMapName(provider: Provider) {
  if (Platform.OS === 'android') {
    return 'AIRMap';
  }
  if (provider === PROVIDER_GOOGLE) {
    return 'AIRGoogleMap';
  }
  return 'AIRMap';
}

function getNativeComponentName(provider: Provider, component: ComponentName) {
  return `${getNativeMapName(provider)}${component}`;
}

export const createNotSupportedComponent = (message: string): (() => null) => {
  return () => {
    console.error(message);
    return null;
  };
};

export const googleMapIsInstalled = !!UIManager.hasViewManagerConfig(
  getNativeMapName(PROVIDER_GOOGLE),
);

export default function decorateMapComponent<Type extends Component>(
  Component: Type,
  componentName: ComponentName,
  providers: Providers,
): Type {
  const components: {
    [key: string]: NativeComponent;
  } = {};

  const getDefaultComponent = () =>
    requireNativeComponent(getNativeComponentName(undefined, componentName));

  // @ts-ignore
  Component.contextType = ProviderContext;

  Component.prototype.getNativeComponent =
    function getNativeComponent(): NativeComponent {
      const provider = this.context;
      if (
        componentName === 'Marker' &&
        (Platform.OS !== 'ios' || provider !== PROVIDER_GOOGLE)
      ) {
        // @ts-ignore
        return FabricMarker;
      }
      if (
        componentName === 'Polygon' &&
        ((provider === PROVIDER_GOOGLE &&
          Platform.OS === 'ios' &&
          googleMapIsInstalled) ||
          Platform.OS === 'android')
      ) {
        // @ts-ignore
        return GooglePolygon;
      }
      if (Platform.OS === 'android') {
        if (componentName === 'Callout') {
          // @ts-ignore
          return FabricCallout;
        } else if (componentName === 'Polyline') {
          // @ts-ignore
          return FabricPolyline;
        } else if (componentName === 'Circle') {
          // @ts-ignore
          return FabricCircle;
        } else if (componentName === 'Overlay') {
          // @ts-ignore
          return FabricOverlay;
        } else if (componentName === 'UrlTile') {
          // @ts-ignore
          return FabricUrlTile;
        } else if (componentName === 'WMSTile') {
          // @ts-ignore
          return FabricWMSTile;
        }
      }
      const key = provider || 'default';
      if (components[key]) {
        return components[key];
      }

      if (provider === PROVIDER_DEFAULT) {
        components[key] = getDefaultComponent();
        return components[key];
      }

      if (!provider) {
        throw new Error('react-native-maps: provider is not set');
      }

      // @ts-ignore
      const providerInfo = providers[provider];

      // quick fix. Previous code assumed android | ios
      if (Platform.OS !== 'android' && Platform.OS !== 'ios') {
        throw new Error(`react-native-maps doesn't support ${Platform.OS}`);
      }

      const platformSupport = providerInfo[Platform.OS];
      const nativeComponentName = getNativeComponentName(
        provider,
        componentName,
      );
      if (platformSupport === NOT_SUPPORTED) {
        components[key] = createNotSupportedComponent(
          `react-native-maps: ${nativeComponentName} is not supported on ${Platform.OS}`,
        );
      } else if (platformSupport === SUPPORTED) {
        if (
          provider !== PROVIDER_GOOGLE ||
          (Platform.OS === 'ios' && googleMapIsInstalled)
        ) {
          components[key] = requireNativeComponent(nativeComponentName);
        }
      } else {
        // (platformSupport === USES_DEFAULT_IMPLEMENTATION)
        if (!components.default) {
          components.default = getDefaultComponent();
        }
        components[key] = components.default;
      }

      return components[key];
    };

  Component.prototype.getUIManagerCommand = function getUIManagerCommand(
    name: string,
  ): UIManagerCommand {
    const nativeComponentName = getNativeComponentName(
      this.context,
      componentName,
    );
    return UIManager.getViewManagerConfig(nativeComponentName).Commands[name];
  };

  Component.prototype.getMapManagerCommand = function getMapManagerCommand(
    name: string,
  ): MapManagerCommand {
    const nativeComponentName = `${getNativeComponentName(
      this.context,
      componentName,
    )}Manager`;
    return NativeModules[nativeComponentName][name];
  };

  return Component;
}

type ImplementationStatus =
  | 'SUPPORTED'
  | 'USES_DEFAULT_IMPLEMENTATION'
  | 'NOT_SUPPORTED';

type Providers = {
  google: {
    ios: ImplementationStatus;
    android: ImplementationStatus;
  };
};

export type UIManagerCommand = number;

export type MapManagerCommand = keyof typeof Commands;

export type NativeComponent<H = unknown> =
  | HostComponent<H>
  | ReturnType<typeof createNotSupportedComponent>;

type Component =
  | typeof MapCallout
  | typeof MapCalloutSubview
  | typeof MapCircle
  | typeof MapHeatmap
  | typeof MapLocalTile
  | typeof MapMarker
  | typeof MapOverlay
  | typeof MapPolygon
  | typeof MapPolyline
  | typeof MapUrlTile
  | typeof MapWMSTile;

type ComponentName =
  | 'Callout'
  | 'CalloutSubview'
  | 'Circle'
  | 'Heatmap'
  | 'LocalTile'
  | 'Marker'
  | 'Overlay'
  | 'Polygon'
  | 'Polyline'
  | 'UrlTile'
  | 'WMSTile';
