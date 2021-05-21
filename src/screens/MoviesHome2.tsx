import React, { useRef } from 'react'
import { View, Dimensions, StyleSheet, ScrollView, Image, Animated, FlatList } from 'react-native'

import SliderMovie from '../components/SliderMovie';
import { useMovies } from '../hooks/useMovies';
import { useCarousel } from '../hooks/useCarousel';
import { useBackgroundBluredImage } from '../hooks/useBackgroundBluredImage';
import { Movie } from '../interfaces/movieDBinterface';
import { imageUrl } from '../utils/images';

import MaskedView from '@react-native-community/masked-view';
import Svg, { Rect } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

export default () => {

  const { nowPlaying, populars, topRated, upcoming } = useMovies();

  const { height, width } = Dimensions.get('screen');

  const ITEM_SIZE = width * 0.713
  const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

  const scrollX = useRef(new Animated.Value(0.5)).current;

  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const Backdrop = ({ movies, scrollX }) => {
    const postersToRender = movies.filter((x) => !x.key)
    return (
      <View style={{ width, height: height * 0.75, position: 'absolute' }}>
        <FlatList
          data={postersToRender}
          horizontal
          removeClippedSubviews={false}
          keyExtractor={(item) => item.id + '-backdrop'}
          renderItem={({ item, index }) => {
            if (!item.poster_path) {
              return null;
            }
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              (index) * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ]
            const translateX = scrollX?.interpolate({
              inputRange,
              outputRange: [-width, width, -width],
            })
            return (
              // <MaskedView style={{ alignItems: 'center' }}
              //   maskElement={
              //     <AnimatedSvg 
              //       style={{transform: [{translateX}]}}
              //       width={width}
              //       height={height}
              //       viewBox={`0 0 ${width} ${height}`}
              //     >
              //       <Rect
              //         x="0"
              //         y="0"
              //         width={width}
              //         height={height}
              //         fill='red'
              //       />
              //     </AnimatedSvg>
              //   }
              // >
              //   <Image source={{ uri: posterPath(item.poster_path) }} style={{ width, height: height * 0.75, resizeMode: 'cover' }} />
              // </MaskedView>
              <Animated.View
                style={{transform: [{translateX}]}}
              >
                <Image source={{ uri: imageUrl(item.poster_path) }} style={{ width, height: height * 0.75, }} />
              </Animated.View>
            )
          }}
        />
        <LinearGradient 
          colors={['transparent', 'white']}
          style={{
            width,
            height: height * 0.75,
            position: 'absolute',
            bottom: 0,
          }}
        />
      </View>
    )
  }

  const renderItem = ({ item, index }) => {
    if (!item.poster_path) {
      return <View style={{width: EMPTY_ITEM_SIZE}} />
    }
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      (index) * ITEM_SIZE,
    ]
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [100, 0, 100],
    })
    return (
    <View style={{ justifyContent: 'center' }}>
        <Animated.View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, padding: 20, borderRadius: 30, backgroundColor: 'white', height: 350, transform: [{translateY}] }}>
          <Image source={{ uri: imageUrl(item.poster_path) }} style={{ width: 200, height: 300, borderRadius: 20 }} />
        </Animated.View>
    </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Backdrop movies={nowPlaying} scrollX={scrollX} />
      <Animated.FlatList
        data={nowPlaying}
        horizontal
        keyExtractor={(item: Movie) => String(item.id)}
        renderItem={renderItem}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </View>
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