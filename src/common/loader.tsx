import React, {ReactElement} from 'react';
import {View, ActivityIndicator, ViewStyle, ColorValue} from 'react-native';

export type LoaderProps = {
  loaderColor?: ColorValue;
  children: ReactElement | ReactElement[];
  loading: boolean;
  style?: ViewStyle | ViewStyle[];
};
const Loader = ({
  children,
  loading = false,
  style = {},
  loaderColor,
}: LoaderProps) => {
  // THIS WILL BE A FULL SCREEN VIEW WITH LOADING INDICATOR
  // CAN USE CUSTOM LOADER RIGHT HERE INSTEAD OF ActivityIndicator
  // PREFERS LOTTY ANIMATIONS
  return (
    <View style={[styles.container]}>
      {children}
      {loading && (
        <View style={[styles.centerView, style]}>
          <ActivityIndicator
            size="large"
            color={loaderColor ? loaderColor : '#ffff'}
          />
        </View>
      )}
    </View>
  );
};

export default Loader;

interface Styles {
  container: ViewStyle;
  subView: ViewStyle;
  absolute: ViewStyle;
  centerView: ViewStyle;
}

const styles: Styles = {
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  subView: {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    margin: 0,
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  centerView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
};
