import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { imageUrl } from '../utils/images';

const { height, width } = Dimensions.get('screen');

const ITEM_SIZE = width * 0.713;
const BACKDROP_HEIGHT = height * 0.7;

export const useBackgroundAlternative = (data, scrollX) => {

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

  return {
    renderFlatlistBackground,
  }
};

const styles = StyleSheet.create({
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
