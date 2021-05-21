import React from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native';
import { imageUrl } from '../utils/images';
import { useMovies } from './useMovies';
import { useSeries } from './useSeries';

export const useBackgroundBluredImage = () => {

  const { nowPlaying } = useMovies();
  const { popularsSeries } = useSeries();

  const { width } = Dimensions.get('screen');

  const moviesBluredImage = (scrollX: any) => {
    return (
      nowPlaying.map((movie, index) => {
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

  const seriesBluredImage = (scrollX: any) => {
    return (
      popularsSeries.map((serie, index) => {
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
          source={{ uri: imageUrl(serie.poster_path) }}
          style={[StyleSheet.absoluteFillObject, { opacity }]}
          blurRadius={50}
        />
      }
      )
    )
  }

  return {
    moviesBluredImage,
    seriesBluredImage,
  }
}
