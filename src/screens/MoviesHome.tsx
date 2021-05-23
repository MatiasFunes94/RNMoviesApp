import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated
} from 'react-native';

import SliderMovie from '../components/SliderMovie';
import { useMovies } from '../hooks/useMovies';
import { useCarousel } from '../hooks/useCarousel';
import { useBackgroundBluredImage } from '../hooks/useBackgroundBluredImage';
import { useAnimation } from '../hooks/useAnimation';
import { Movie } from '../interfaces/movieDBinterface';

export default () => {

  const { nowPlaying, populars, topRated, upcoming } = useMovies();
  const { fadeIn, opacity } = useAnimation();

  const [changeOpacityisLoading, setChangeOpacityisLoading] = useState(false)
  
  const nowPlayingToRender = nowPlaying.filter((movie: Movie) => movie.poster_path)

  const { renderCarousel, scrollX } = useCarousel(nowPlayingToRender);
  const { renderFlatlistBluredImage } = useBackgroundBluredImage(nowPlayingToRender, scrollX);

  const { height } = Dimensions.get('screen');

  useEffect(() => {
    fadeIn(2000);
    setTimeout(() => {
      setChangeOpacityisLoading(true)
    }, 1500);
  }, [])

  const renderIsLoading = () => (
    <ActivityIndicator
      color="#000"
      size={50}
      style={{
        ...styles.actIndicatorStyle,
        opacity: changeOpacityisLoading ? 0 : 1,
        top: height * 0.45
      }}
    />
  )

  return (
    <ScrollView>
      {renderIsLoading()}
      <Animated.View style={{ opacity }}>
        <View style={{ height }}>
          {scrollX && renderFlatlistBluredImage()}
        </View>
        {nowPlaying && renderCarousel()}
        <View style={styles.container}>
          <SliderMovie data={populars} customStyles={styles.posters} title={'Populars'} />
          <SliderMovie data={topRated} customStyles={styles.posters} title={'Top rated'} />
          <SliderMovie data={upcoming} customStyles={styles.posters} title={'Upcoming'} />
        </View>
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  posters: {
    height: 220,
    width: 140,
    marginHorizontal: 7,
  },
  actIndicatorStyle: {
    alignSelf: 'center',
  }
})