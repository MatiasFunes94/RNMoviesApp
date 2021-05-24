import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useCarouselAlternative } from '../hooks/useCarouselAlternative';
import { useAnimation } from '../hooks/useAnimation';
import { useSeries } from '../hooks/useSeries';
import SliderMovie from '../components/SliderMovie';

export default () => {
  const { height } = Dimensions.get('screen');
  const { fadeIn, opacity } = useAnimation();
  const { airingTodaySeries, popularsSeries, topRatedSeries } = useSeries();
  const { renderCarouselAlternative } = useCarouselAlternative(popularsSeries);

  const [changeOpacityisLoading, setChangeOpacityisLoading] = useState(false)

  useEffect(() => {
    fadeIn(1500);
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
      {renderCarouselAlternative()}
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
    position: 'absolute',
  }
})