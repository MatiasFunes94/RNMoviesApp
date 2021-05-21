import React, { useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';

import SearchHeader from '../components/SearchHeader';
import { RootStackParams } from '../navigation/Navigation';
import { useMultiSearch } from '../hooks/useMultiSearch';
import { useMovies } from '../hooks/useMovies';
import { imageUrl, smallImages } from '../utils/images';

interface Props extends StackScreenProps<RootStackParams, 'SearchScreen'> { };

interface Props {
  data?: [];
}

const popularItem = ({ item, handleNavigate }) => (
  <TouchableOpacity style={styles.popularItemContainer} onPress={() => handleNavigate('DetailScreen', item)}>
    <Image source={{ uri: smallImages(item.backdrop_path) }} style={styles.popularItemImage} />
    <View style={styles.popularItemContainerTitle}>
      <Text style={styles.popularItemTitle}>{item.title || item.name}</Text>
      <Icon name='arrow-forward-circle-outline' size={35} color='#000' style={{ marginRight: 10 }} />
    </View>
  </TouchableOpacity>
)

const listMostViewed = (data, handleNavigate) => {
  const dataToRender = data.filter((x) => x.id !== 'left-spacer' && x.id !== 'right-spacer')
  return (
    <View style={styles.containerMostViewed}>
      <Text style={styles.textMostViewed}>Most viewed</Text>
      <FlatList
        data={dataToRender}
        renderItem={popularItem}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  )
}

const listMoviesSearched = (multiSearch, handleNavigate) => {
  return (
    <ScrollView>
      <Text style={styles.textMoviesSearched}>Movies and Series</Text>
      <View style={styles.containerMoviesSearched}>
        {
          multiSearch!.map((item, index) => {
            if (item.poster_path) {
              return (
                <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => handleNavigate('DetailScreen', item)}>
                  <Image source={{ uri: imageUrl(item.poster_path) }} style={styles.posterStyle} />
                </TouchableOpacity>
              )
            }
            return (
              <TouchableOpacity activeOpacity={0.5} key={index} style={styles.textSearched} onPress={() => handleNavigate('DetailScreen', item)}>
                <View style={styles.containerPosterNotFound}>
                  <Icon name='information-circle-outline' size={35} color='#000' style={{ marginRight: 10 }} />
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

const SearchScreen = ({ route }: Props) => {

  const [userInput, onChangeText] = useState('')

  const { isLoadingSearch, multiSearch } = useMultiSearch(userInput);
  const { navigate } = useNavigation();

  const handleNavigate = (route: string, data) => {
    navigate(route, data);
  }

  const { nowPlaying } = useMovies();

  return (
    <View>
      <View style={styles.container} />
      <SearchHeader onChangeText={onChangeText} userInput={userInput} />
      {
        multiSearch.length === 0 ?
        listMostViewed(nowPlaying, handleNavigate) :
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