import React, { useRef } from 'react'
import {
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
      <Icon name='arrow-up' size={35} color='#fff' />
      <Text style={styles.swipeText}>Swipe up</Text>
    </View>
  )

  const renderCarousel = () => {
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
  
  return {
    renderCarousel,
    scrollX,
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