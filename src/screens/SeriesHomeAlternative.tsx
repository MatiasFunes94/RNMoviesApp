import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import { useCarouselAlternative } from '../hooks/useCarouselAlternative';
import { useBackgroundAlternative } from '../hooks/useBackgroundAlternative';
import SliderMovie from '../components/SliderMovie';
import { useSeries } from '../hooks/useSeries';

export default () => {
  const { airingTodaySeries, popularsSeries, topRatedSeries } = useSeries();
  const { renderFlatlistCarousel, scrollX } = useCarouselAlternative(popularsSeries);
  const { renderFlatlistBackground } = useBackgroundAlternative(popularsSeries, scrollX);

  const { height } = Dimensions.get('screen');

  return (
    <ScrollView>
      <View style={{ height }}>
        {renderFlatlistBackground()}
        {renderFlatlistCarousel()}
      </View>
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