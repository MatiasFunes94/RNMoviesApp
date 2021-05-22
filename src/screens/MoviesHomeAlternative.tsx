import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import { useMovies } from '../hooks/useMovies';
import { useCarouselAlternative } from '../hooks/useCarouselAlternative';
import { useBackgroundAlternative } from '../hooks/useBackgroundAlternative';
import SliderMovie from '../components/SliderMovie';

export default () => {
  const { nowPlaying, populars, topRated, upcoming } = useMovies();
  const { renderFlatlistCarousel, scrollX } = useCarouselAlternative(nowPlaying);
  const { renderFlatlistBackground } = useBackgroundAlternative(nowPlaying, scrollX);

  const { height } = Dimensions.get('screen');

  return (
    <ScrollView>
      <View style={{ height }}>
        {renderFlatlistBackground()}
        {renderFlatlistCarousel()}
      </View>
      <View style={styles.container}>
        <SliderMovie data={populars} customStyles={styles.posters} title={'Populars'} />
        <SliderMovie data={topRated} customStyles={styles.posters} title={'Top rated'} />
        <SliderMovie data={upcoming} customStyles={styles.posters} title={'Upcoming'} />
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