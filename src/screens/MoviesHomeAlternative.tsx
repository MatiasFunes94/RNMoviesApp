import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useMovies } from '../hooks/useMovies';
import { useCarouselAlternative } from '../hooks/useCarouselAlternative';
import { useAnimation } from '../hooks/useAnimation';
import SliderMovie from '../components/SliderMovie';

export default () => {
  const { height } = Dimensions.get('screen');
  const { fadeIn, opacity } = useAnimation();
  const { nowPlaying, populars, topRated, upcoming } = useMovies();
  const { renderCarouselAlternative } = useCarouselAlternative(nowPlaying);

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
    position: 'absolute',
  }
})