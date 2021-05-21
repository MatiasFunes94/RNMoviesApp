import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Platform,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useMovies } from '../hooks/useMovies';
import { Movie } from '../interfaces/movieDBinterface';
import { posterPath } from '../utils/images';

const { height, width } = Dimensions.get('screen');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.713;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.7;

const Backdrop = ({ movies, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop_path) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: posterPath(item.backdrop_path) }}
                style={{
                  width,
                  height: height * 0.7,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={['transparent', '#fff']}
        style={{
          width,
          height: height * 0.45,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};

export default function App() {
  const { nowPlaying } = useMovies();
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Backdrop movies={nowPlaying} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={nowPlaying}
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
        renderItem={({ item, index }) => {
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
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING * 2,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{ translateY }],
                  backgroundColor: '#fff',
                  borderRadius: 30,
                }}
              >
                <Image source={{ uri: posterPath(item.poster_path) }} style={{ width: 200, height: 300, borderRadius: 20 }} />
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                  <Icon name='arrow-up' size={35} color='#000' />
                  <Text style={{ fontSize: 25, color: '#000', width: 150, textAlign: 'center' }}>Swipe up</Text>
              </View>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
