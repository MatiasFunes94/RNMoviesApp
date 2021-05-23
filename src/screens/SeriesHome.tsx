import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native'

import SliderMovie from '../components/SliderMovie';

import { useSeries } from '../hooks/useSeries';
import { useCarousel } from '../hooks/useCarousel';
import { useBackgroundBluredImage } from '../hooks/useBackgroundBluredImage';
import { useAnimation } from '../hooks/useAnimation';
import { Serie } from '../interfaces/serieDBinterface';

export default () => {

  const { airingTodaySeries, popularsSeries, topRatedSeries } = useSeries();
  const { fadeIn, opacity } = useAnimation();

  const [changeOpacityisLoading, setChangeOpacityisLoading] = useState(false)

  const popularsSeriesToRender = popularsSeries.filter((serie: Serie) => serie.poster_path)

  const { renderCarousel, scrollX } = useCarousel(popularsSeriesToRender);
  const { renderFlatlistBluredImage } = useBackgroundBluredImage(popularsSeriesToRender, scrollX);

  const { height } = Dimensions.get('screen');

  useEffect(() => {
    fadeIn(1000);
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
        {popularsSeries && renderCarousel()}
        <View style={styles.container}>
          <SliderMovie data={airingTodaySeries} customStyles={styles.posters} title={'Airing today'} />
          <SliderMovie data={popularsSeries} customStyles={styles.posters} title={'Populars'} />
          <SliderMovie data={topRatedSeries} customStyles={styles.posters} title={'Top rated'} />
        </View>
      </Animated.View>
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
  actIndicatorStyle: {
    alignSelf: 'center',
  }
})
