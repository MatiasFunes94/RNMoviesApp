import React from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native';
import { imageUrl } from '../utils/images';

export const useBackgroundBluredImage = (data, scrollX) => {

  const { width } = Dimensions.get('screen');

  const renderFlatlistBluredImage = () => {
    return (
      data.map((movie, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ]
        const opacity = scrollX?.interpolate({
          inputRange,
          outputRange: ['0', '1', '0']
        })
        return <Animated.Image
          key={index}
          source={{ uri: imageUrl(movie.poster_path) }}
          style={[StyleSheet.absoluteFillObject, { opacity }]}
          blurRadius={50}
        />
      }
      )
    )
  }

  return {
    renderFlatlistBluredImage,
  }
}
