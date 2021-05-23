import React from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import SliderMovie from '../components/SliderMovie';
import { useMovies } from '../hooks/useMovies';
import { useCarousel } from '../hooks/useCarousel';
import { useBackgroundBluredImage } from '../hooks/useBackgroundBluredImage';

export default () => {

  const { nowPlaying, populars, topRated, upcoming } = useMovies();
  const { renderCarousel, scrollX } = useCarousel(nowPlaying);
  const { renderFlatlistBluredImage } = useBackgroundBluredImage(nowPlaying, scrollX);

  const { height } = Dimensions.get('screen');

  return (
    <ScrollView>
      <View>
        <View style={{ height }}>
          {scrollX && renderFlatlistBluredImage()}
        </View>
        {nowPlaying && renderCarousel()}
        <View style={styles.container}>
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
    paddingHorizontal: 20,
    marginTop: 20
  },
  posters: {
    height: 220,
    width: 140,
    marginHorizontal: 7,
  },
})