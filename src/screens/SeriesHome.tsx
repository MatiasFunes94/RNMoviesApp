import React, { useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, FlatList, ScrollView, Image, Text, Animated, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import SliderMovie from '../components/SliderMovie';
import { useMovies } from '../hooks/useMovies';
import { useSeries } from '../hooks/useSeries';
import { useCarousel } from '../hooks/useCarousel';
import { useBackgroundBluredImage } from '../hooks/useBackgroundBluredImage';
import { useNavigation } from '@react-navigation/core';
import CarouselNew from '../components/CarouselNew';

export default () => {

  const { airingTodaySeries, popularsSeries, topRatedSeries, isLoadingSeries } = useSeries();
  const { carouselSeries, scrollX } = useCarousel();
  const { seriesBluredImage } = useBackgroundBluredImage();

  const { navigate } = useNavigation();

  const { height } = Dimensions.get('screen');

  return (
    <ScrollView >
      <View>
        <View style={{ height }}>
          {seriesBluredImage(scrollX)}
        </View>
        {carouselSeries()}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <SliderMovie data={airingTodaySeries} customStyles={styles.posters} title={'Airing today'} />
          <SliderMovie data={popularsSeries} customStyles={styles.posters} title={'Populars'} />
          <SliderMovie data={topRatedSeries} customStyles={styles.posters} title={'Top rated'} />
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
