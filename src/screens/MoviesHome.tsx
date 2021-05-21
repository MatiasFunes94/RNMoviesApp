import React from 'react'
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native'

import SliderMovie from '../components/SliderMovie';
import { useMovies } from '../hooks/useMovies';
import { useCarousel } from '../hooks/useCarousel';
import { useBackgroundBluredImage } from '../hooks/useBackgroundBluredImage';

export default () => {

  const { nowPlaying, populars, topRated, upcoming } = useMovies();
  const { carouselMovies, scrollX } = useCarousel();
  const { moviesBluredImage } = useBackgroundBluredImage();

  const { height } = Dimensions.get('screen');
  return (
    <ScrollView>
      <View>
        <View style={{ height }}>
          {scrollX && moviesBluredImage(scrollX)}
        </View>
        {nowPlaying && carouselMovies()}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <SliderMovie data={populars} customStyles={styles.posters} title={'Populars'} />
          <SliderMovie data={topRated} customStyles={styles.posters} title={'Top rated'} />
          <SliderMovie data={upcoming} customStyles={styles.posters} title={'Upcoming'} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  posters: {
    height: 220,
    width: 140,
    marginHorizontal: 7,
  },
  nowPlayingMovies: {
    height: 380,
    width: 250,
  },
})