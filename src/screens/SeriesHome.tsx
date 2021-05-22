import React from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView
} from 'react-native'

import SliderMovie from '../components/SliderMovie';

import { useSeries } from '../hooks/useSeries';
import { useCarousel } from '../hooks/useCarousel';
import { useBackgroundBluredImage } from '../hooks/useBackgroundBluredImage';

export default () => {

  const { airingTodaySeries, popularsSeries, topRatedSeries } = useSeries();
  const { renderCarousel, scrollX } = useCarousel(popularsSeries);
  const { renderFlatlistBluredImage } = useBackgroundBluredImage(popularsSeries, scrollX);

  const { height } = Dimensions.get('screen');

  return (
    <ScrollView >
      <View style={{ height }}>
        {renderFlatlistBluredImage()}
      </View>
      {renderCarousel()}
      <View style={styles.container}>
        <SliderMovie data={airingTodaySeries} customStyles={styles.posters} title={'Airing today'} />
        <SliderMovie data={popularsSeries} customStyles={styles.posters} title={'Populars'} />
        <SliderMovie data={topRatedSeries} customStyles={styles.posters} title={'Top rated'} />
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
