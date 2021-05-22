import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';

import { useMovies } from '../hooks/useMovies';
import { useMultiSearch } from '../hooks/useMultiSearch';
import SearchHeader from '../components/SearchHeader';
import { RootStackParams } from '../navigation/Navigation';
import { imageUrl, smallImages } from '../utils/images';
import { Movie } from '../interfaces/movieDBinterface';
import { Serie } from '../interfaces/serieDBinterface';
import useDebounce from '../hooks/useDebounce';
import { useAnimation } from '../hooks/useAnimation';

interface Props extends StackScreenProps<RootStackParams, 'SearchScreen'> { };

const popularItem = (item: Movie | Serie, handleNavigate: (screen: string, item: Movie | Serie) => void, opacity) => (
  <Animated.View style={{ opacity }}>
    <TouchableOpacity
      style={styles.popularItemContainer}
      onPress={() => handleNavigate('DetailScreen', item)}
      activeOpacity={0.5}
    >
      <Image
        source={{ uri: smallImages(item.backdrop_path) }}
        style={styles.popularItemImage}
      />
      <View style={styles.popularItemContainerTitle}>
        <Text style={styles.popularItemTitle}>{item.title || item.name}</Text>
        <Icon
          name='arrow-forward-circle-outline'
          size={35}
          color='#000'
          style={{ marginRight: 10 }}
        />
      </View>
    </TouchableOpacity>
  </Animated.View>
)

const listMostViewed = (data: (Movie | Serie)[], handleNavigate: (screen: string, item: Movie | Serie) => void, opacity) => {
  const dataToRender = data.filter((movie) => movie.id !== 'left-spacer' && movie.id !== 'right-spacer')
  return (
    <Animated.View style={{...styles.containerMostViewed, opacity}}>
      <Text style={styles.textMostViewed}>Most viewed</Text>
      <FlatList
        data={dataToRender}
        renderItem={({ item }) => popularItem(item, handleNavigate, opacity)}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </Animated.View>
  )
}

const listMoviesSearched = (multiSearch: (Movie | Serie)[], handleNavigate: (screen: string, item: Movie | Serie) => void) => {
  const sortMoviesWithPoster = multiSearch.sort((a, b) => !a.poster_path - !b.poster_path)
  return (
    <ScrollView>
      <Text style={styles.textMoviesSearched}>Movies and Series</Text>
      <View style={styles.containerMoviesSearched}>
        {
          sortMoviesWithPoster!.map((item: Movie | Serie, index: number) => {
            if (item.poster_path) {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  onPress={() => handleNavigate('DetailScreen', item)}
                >
                  <Image
                    source={{ uri: imageUrl(item.poster_path) }}
                    style={styles.posterStyle}
                  />
                </TouchableOpacity>
              )
            }
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                style={styles.textSearched}
                onPress={() => handleNavigate('DetailScreen', item)}
              >
                <View style={styles.containerPosterNotFound}>
                  <Icon
                    name='information-circle-outline'
                    size={35}
                    color='#000'
                    style={{ marginRight: 10 }}
                  />
                  <Text>Poster not found</Text>
                </View>
                <Text numberOfLines={10} style={styles.titleMovie}>{item.title || item.name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </ScrollView>
  )
}

const SearchScreen = () => {

  const [userInput, onChangeText] = useState('')
  const debouncedValue = useDebounce(userInput);
  const { isLoadingSearch, multiSearch } = useMultiSearch(debouncedValue);
  const { navigate } = useNavigation();
  const { opacity, fadeIn } = useAnimation();

  const handleNavigate = (route: string, data: Movie | Serie) => {
    navigate(route, data);
  }

  const { nowPlaying } = useMovies();

  useEffect(() => {
    fadeIn(700);
  }, [])

  return (
    <View>
      <View style={styles.container} />
      <SearchHeader onChangeText={onChangeText} userInput={userInput} />
      {
        multiSearch.length === 0 ?
          listMostViewed(nowPlaying, handleNavigate, opacity) :
          listMoviesSearched(multiSearch, handleNavigate)
      }
    </View>
  )
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#000'
  },
  textSearched: {
    height: 180,
    width: 125,
    margin: 2,
    justifyContent: 'center'
  },
  containerMostViewed: {
    paddingBottom: 320
  },
  textMostViewed: {
    fontWeight: 'bold',
    fontSize: 22,
    marginVertical: 10,
    paddingLeft: 10
  },
  popularItemContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    backgroundColor: '#ebecf0'
  },
  popularItemImage: {
    height: 80,
    width: 140
  },
  popularItemContainerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  popularItemTitle: {
    width: '65%',
    marginLeft: 10,
    fontSize: 16
  },
  textMoviesSearched: {
    fontWeight: 'bold',
    fontSize: 22,
    marginVertical: 10,
    paddingLeft: 10
  },
  containerMoviesSearched: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingBottom: 100
  },
  posterStyle: {
    height: 180,
    width: 125,
    margin: 2
  },
  containerPosterNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleMovie: {
    textAlign: 'center',
  },
})