import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Movie } from '../interfaces/movieDBinterface';
import { imageUrl } from '../utils/images';

export const useCarouselAlternative = (data) => {

  const { width } = Dimensions.get('screen');
  const { navigate } = useNavigation();

  const SPACING = 10;
  const ITEM_SIZE = width * 0.713;
  const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

  const scrollX = useRef(new Animated.Value(0)).current;

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
            <Icon name='arrow-up' size={35} color='#000' />
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

  return {
    renderFlatlistCarousel,
    scrollX,
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
});
