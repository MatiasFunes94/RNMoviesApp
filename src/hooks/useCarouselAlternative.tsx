import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Movie } from '../interfaces/movieDBinterface';
import { imageUrl } from '../utils/images';

export const useCarouselAlternative = (data) => {

  const { height, width } = Dimensions.get('screen');
  const { navigate } = useNavigation();

  const SPACING = 10;
  const ITEM_SIZE = width * 0.713;
  const BACKDROP_HEIGHT = height * 0.7;
  const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

  const scrollX = useRef(new Animated.Value(0)).current;

  const renderBackDropItem = (item, index) => {
    if (!item.backdrop_path) {
      return null;
    }
    const translateX = scrollX.interpolate({
      inputRange: [
        (index - 2) * ITEM_SIZE,
        (index - 1) * ITEM_SIZE
      ],
      outputRange: [0, width],
    });
    return (
      <Animated.View
        removeClippedSubviews={false}
        style={{
          width: translateX,
          height,
          ...styles.backdropContainer
        }}
      >
        <Image
          source={{ uri: imageUrl(item.backdrop_path) }}
          style={{
            width,
            height: height * 0.7,
            ...styles.backdropImage
          }}
        />
      </Animated.View>
    );
  }

  const renderFlatlistBackground = () => (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => renderBackDropItem(item, index)}
      />
      <LinearGradient
        colors={['transparent', '#ebecf0']}
        style={{
          width,
          height: height * 0.45,
          ...styles.linearGradientStyle
        }}
      />
    </View>
  );

  const renderPosterItem = (item, index) => {
    if (!item.poster_path) {
      return <View style={{ width: EMPTY_ITEM_SIZE }} />;
    }
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [200, 150, 200],
    });
    return (
      <TouchableOpacity 
        style={{ width: ITEM_SIZE }}
        activeOpacity={0.8}
        onPress={() => navigate('DetailScreen', item)}
      >
        <Animated.View
          style={{
            marginHorizontal: SPACING * 2,
            padding: SPACING * 2,
            transform: [{ translateY }],
            ...styles.containerPosterItem,
          }}
        >
          <Image 
            source={{ uri: imageUrl(item.poster_path) }} 
            style={styles.imagePosterItem} 
          />
        <View style={styles.containerSwipeUp}>
            <Icon name='chevron-up-circle-outline' size={50} color='#000' />
            <Text style={styles.swipeUpText}>Swipe up</Text>
        </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  const renderFlatlistCarousel = () => (
    <Animated.FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item: Movie) => String(item.id)}
      horizontal
      bounces={false}
      decelerationRate={0.93}
      renderToHardwareTextureAndroid
      contentContainerStyle={{ alignItems: 'center' }}
      snapToInterval={ITEM_SIZE}
      snapToAlignment='start'
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => renderPosterItem(item, index)}
    />
  )

  const renderCarouselAlternative = () => (
    <View style={{ height, backgroundColor: '#ebecf0' }}>
      {renderFlatlistBackground()}
      {renderFlatlistCarousel()}
    </View>
  )

  return {
    renderCarouselAlternative,
  }
}

const styles = StyleSheet.create({
  containerPosterItem: {
    backgroundColor: '#ebecf0',
    borderRadius: 30,
    alignItems: 'center',
  },
  imagePosterItem: {
    width: 200, 
    height: 300, 
    borderRadius: 20
  },
  containerSwipeUp: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 50
  },
  swipeUpText: {
    fontSize: 25, 
    color: '#000',
    width: 150, 
    textAlign: 'center'
  },
  backdropContainer: {
    position: 'absolute',
    overflow: 'hidden',
  },
  backdropImage: {
    position: 'absolute',
  },
  linearGradientStyle: {
    position: 'absolute',
    bottom: 0,
  }
});
