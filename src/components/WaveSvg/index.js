import React, {useEffect} from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import { useAnimation } from '../../hooks/useAnimation';

import WavyHeader from './WavyHeader';

export default function WaveScreen({ urlPicture }) {
  const { opacity, fadeIn } = useAnimation();
  useEffect(() => {
    fadeIn(800);
  }, [])
  return (
    <View>
      <WavyHeader
        customStyles={styles.svgCurve}
        customHeight={450}
        customTop={280}
        customBgColor={'#000'}
        customWavePattern="M0.00,49.98 C161.68,129.77 383.46,109.03 500.00,49.98 L499.15,-3.45 L-1.41,-4.44 Z"
        bgColor={'#000'}
      />
      <View style={styles.containerItem}>
        <Animated.Image
          source={urlPicture}
          style={{...styles.imageStyle, opacity }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    top: 150,
    alignItems: 'center',
  },
  imageStyle: {
    width: 300,
    height: 210,
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  row: {
    flexDirection: 'row'
  }
});