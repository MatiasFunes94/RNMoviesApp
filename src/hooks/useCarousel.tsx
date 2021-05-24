import React, { useRef } from 'react'
import {
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';

import { imageUrl } from '../utils/images';

export const useCarousel = (data) => {
  const { navigate } = useNavigation();

  const { height, width } = Dimensions.get('screen');

  const imageW = width * 0.8;
  const imageH = height * 1.54;

  const scrollX = useRef(new Animated.Value(0)).current

  const renderFlatlistBluredImage = () => {
    return (
      data.map((movie, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ]
        const opacity = scrollX?.interpolate({
          inputRange,
          outputRange: ['0', '1', '0']
        })
        return <Animated.Image
          key={index}
          source={{ uri: imageUrl(movie.poster_path) }}
          style={[StyleSheet.absoluteFillObject, { opacity }]}
          blurRadius={50}
        />
      }
      )
    )
  }

  const keyExtractor = (item, index) => String(index)

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={{ ...styles.containerItemCarousel, width }} 
      activeOpacity={0.8} 
      onPress={() => navigate('DetailScreen', item)}
    >
      <Animated.Image
        source={{ uri: imageUrl(item.poster_path) }}
        style={{ ...styles.aniamtedImage, width: imageW }}
      />
    </TouchableOpacity>
  )

  const renderSwipeText = () => (
    <View style={styles.containerSwipe}>
      <Icon name='chevron-up-circle-outline' size={50} color='#fff' />
      <Text style={styles.swipeText}>Swipe up</Text>
    </View>
  )

  const renderCarouselComponent = () => {
    return (
      <View style={styles.containerCarousel}>
        <Carousel
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          sliderWidth={width}
          itemWidth={width}
          // autoplay
          // autoplayDelay={500}
          // autoplayInterval={3000}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )
          }
        />
        {renderSwipeText()}
      </View>
    )
  }

  const renderCarousel = () => (
    <View>
      <View style={{ height }}>
        {scrollX && renderFlatlistBluredImage()}
      </View>
      {renderCarouselComponent()}
    </View>
  )

  return {
    renderCarousel,
  }
}

const styles = StyleSheet.create({
  containerCarousel: {
    position: 'absolute',
    top: 125
  },
  containerSwipe: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  containerItemCarousel: {
    alignItems: 'center'
  },
  swipeText: {
    fontSize: 25,
    color: '#fff',
    width: 150,
    textAlign: 'center'
  },
  aniamtedImage: {
    height: 450,
    resizeMode: 'cover',
    borderRadius: 16
  }
})