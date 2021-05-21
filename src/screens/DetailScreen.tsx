import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import Svg, { Image, ClipPath, Circle } from 'react-native-svg';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';

import { posterPath } from '../utils/images';
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetail } from '../hooks/useMovieDetail';
import SliderScreenshots from '../components/SliderScreenshots';
import SliderCast from '../components/SliderCast';
import { useNavigation } from '@react-navigation/core';
import { useSerieDetail } from '../hooks/useSerieDetail';
import ModalComponent from '../components/ModalComponent';
import YoutubePlayerComponent from '../components/YoutubePlayer';
import { useAnimation } from '../hooks/useAnimation';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { };

const { height, width } = Dimensions.get('window');

const DetailScreen = ({ route }: Props) => {

  const { opacity, fadeIn } = useAnimation();
  const navigation = useNavigation();
  const data = route.params;

  const { isLoadingMovie, movieFull, castMovie } = useMovieDetail(data);
  const { isLoadingSerie, serieFull, castSerie } = useSerieDetail(data);

  const [modalVisible, setModalVisible] = useState(false)
  const [itemToShowInModal, setItemToShowInModal] = useState()
  const [playing, setPlaying] = useState(false);

  const YoutubeComponent = (playing, setPlaying) => {
    let videoToPlay = ''
    if (movieFull?.videos.results ) {
      const moviesTrailers = movieFull.videos.results.filter((video) => video.type === 'Trailer')
      videoToPlay = moviesTrailers[0]?.key
    }
    if (serieFull?.videos.results) {
      const seriesTrailers = serieFull.videos.results.filter((video) => video.type === 'Trailer')
      videoToPlay = seriesTrailers[0]?.key
    }
    return (
      <>
        <ActivityIndicator
          style={{ alignItems: 'center', top: 125 }}
          color="red"
          size={40}
        />
        <YoutubePlayerComponent playing={playing} setPlaying={setPlaying} videoToPlay={videoToPlay} />
      </>
    )
  }


  const renderMoviesDetailScreen = () => {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: modalVisible? '#d0d0d0' : '#ebecf0' }}>
        <View style={styles.goBackButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' size={35} color='#fff' />
          </TouchableOpacity>
        </View>
        {
          data?.backdrop_path &&
          <Svg height={350} width={width * 1.2}>
            <ClipPath id="clipPath">
              <Circle cx={width / 2} cy={-100} r={450} fill="green" />
            </ClipPath>
            <Image
              clipPath="url(#clipPath)"
              width={width}
              height={350}
              preserveAspectRatio="xMidYMid slice"
              href={{ uri: posterPath(data?.backdrop_path) }}
            /> 
          </Svg>
        }
        {
          !playing && !isLoadingMovie && data?.backdrop_path && movieFull.videos.results.length > 0 &&
          <View style={{justifyContent: 'center', alignSelf: 'center', bottom: 30}}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setPlaying(true)} style={{ height: 70, width: 70, borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center' }}>
              <Icon name='play' size={30} color='#E50914' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
        }
        {playing && YoutubeComponent(playing, setPlaying)}
        {
          isLoadingMovie ?
            <ActivityIndicator size={50} color='red' style={{ marginTop: 100 }} /> :
            <View style={{ paddingHorizontal: 20 }}>
              <View style={styles.containerTitle}>
                <Text style={styles.title}>{movieFull?.title}</Text>
              </View>
              <View style={styles.genresContainer}>
                <Text style={[styles.genres]}>{movieFull?.genres.map(({ name }) => `${name}    `)}</Text>
              </View>
              <View>
                <StarRating
                  emptyStar={'star-o'}
                  fullStar={'star'}
                  halfStar={'star-half-full'}
                  iconSet={'FontAwesome'}
                  maxStars={5}
                  rating={movieFull?.vote_average / 2}
                  fullStarColor={'#E50914'}
                  containerStyle={{ justifyContent: 'center', width: 200, alignSelf: 'center', marginTop: 15 }}
                  buttonStyle={{ padding: 5 }}
                  starSize={25}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                {
                  data.release_date &&
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text style={styles.dataMovieUp}>Year</Text>
                    <Text style={styles.dataMovieDown}>{data?.release_date.slice(0, 4)}</Text>
                  </View>
                }
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={styles.dataMovieUp}>Language</Text>
                  <Text style={styles.dataMovieDown}>{movieFull?.original_language.toUpperCase()}</Text>
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={styles.dataMovieUp}>Length</Text>
                  <Text style={styles.dataMovieDown}>{`${movieFull?.runtime} min`}</Text>
                </View>
              </View>
              <Text style={styles.overview}>{movieFull?.overview}</Text>
              {
                movieFull?.images.backdrops.length > 0 &&
                <View style={styles.screenshotsContainer}>
                  <View style={styles.containerSecondaryTitleIcon}>
                    <Text style={styles.secondaryTitle}>Screenshots</Text>
                    <Icon name='arrow-forward' size={30} />
                  </View>
                  <SliderScreenshots data={movieFull?.images.backdrops} customStyles={styles.screenshots} setModalVisible={setModalVisible} setItemToShowInModal={setItemToShowInModal} />
                </View>
              }
              {
                castMovie.length > 0 &&
                <View>
                  <View style={styles.containerSecondaryTitleIcon}>
                    <Text style={styles.secondaryTitle}>Cast</Text>
                    <Icon name='arrow-forward' size={30} />
                  </View>
                  <SliderCast actors={castMovie} setModalVisible={setModalVisible} setItemToShowInModal={setItemToShowInModal} />
                </View>
              }
                <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} item={itemToShowInModal} />
            </View>
        }
      </ScrollView>
    )
  }

  const renderSeriesDetailScreen = () => {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: modalVisible? '#d0d0d0' : '#ebecf0' }}>
        <View style={styles.goBackButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' size={35} color='#fff' />
          </TouchableOpacity>
        </View>
        {
          data?.backdrop_path &&
          <Svg height={350} width={width * 1.2}>
            <ClipPath id="clipPath">
              <Circle cx={width / 2} cy={-100} r={450} fill="green" />
            </ClipPath>
            <Image
              clipPath="url(#clipPath)"
              width={width}
              height={350}
              preserveAspectRatio="xMidYMid slice"
              href={{ uri: posterPath(data?.backdrop_path) }}
            />
          </Svg>
        }
        {
          !playing && !isLoadingSerie && data?.backdrop_path && serieFull.videos.results.length > 0 &&
          <View style={{justifyContent: 'center', alignSelf: 'center', bottom: 30}}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setPlaying(true)}  style={{ height: 70, width: 70, borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center' }}>
              <Icon name='play' size={30} color='#E50914' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
        }
        {playing && YoutubeComponent(playing, setPlaying)}
        {
          isLoadingSerie ?
            <ActivityIndicator size={50} color='red' style={{ marginTop: 100 }} /> :
            <View style={{ paddingHorizontal: 20 }}>
              <View style={styles.containerTitle}>
                <Text style={styles.title}>{serieFull?.name}</Text>
              </View>
              <View style={styles.genresContainer}>
                <Text style={styles.genres}>{serieFull?.genres.map(({ name }) => `${name}    `)}</Text>
              </View>
              <View>
                <StarRating
                  emptyStar={'star-o'}
                  fullStar={'star'}
                  halfStar={'star-half-full'}
                  iconSet={'FontAwesome'}
                  maxStars={5}
                  rating={serieFull?.vote_average / 2}
                  fullStarColor={'#E50914'}
                  containerStyle={{ justifyContent: 'center', width: 200, alignSelf: 'center', marginTop: 15 }}
                  buttonStyle={{ padding: 5 }}
                  starSize={25}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={styles.dataMovieUp}>Episodes</Text>
                  <Text style={styles.dataMovieDown}>{serieFull?.number_of_episodes}</Text>
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={styles.dataMovieUp}>Language</Text>
                  <Text style={styles.dataMovieDown}>{serieFull?.original_language.toUpperCase()}</Text>
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={styles.dataMovieUp}>Seasons</Text>
                  <Text style={styles.dataMovieDown}>{serieFull?.number_of_seasons}</Text>
                </View>
              </View>
              <Text style={styles.overview}>{serieFull?.overview}</Text>
              {
                serieFull?.seasons.length > 0 && serieFull?.seasons[0].poster_path !== null &&
                <View style={{ marginTop: 20 }}>
                  <View style={styles.containerSecondaryTitleIcon}>
                    <Text style={styles.secondaryTitle}>Seasons</Text>
                    <Icon name='arrow-forward' size={30} />
                  </View>
                  <SliderScreenshots data={serieFull?.seasons} customStyles={styles.seasons} setModalVisible={setModalVisible} setItemToShowInModal={setItemToShowInModal} />
                </View>
              }
              {
                serieFull?.images?.backdrops.length > 0 &&
                <View style={styles.screenshotsContainer}>
                  <View style={styles.containerSecondaryTitleIcon}>
                    <Text style={styles.secondaryTitle}>Screenshots</Text>
                    <Icon name='arrow-forward' size={30} />
                  </View>
                  <SliderScreenshots data={serieFull?.images?.backdrops} customStyles={styles.screenshots} setModalVisible={setModalVisible} setItemToShowInModal={setItemToShowInModal} />
                </View>
              }
              {
                castSerie.length > 0 &&
                <View>
                  <View style={styles.containerSecondaryTitleIcon}>
                    <Text style={styles.secondaryTitle}>Cast</Text>
                    <Icon name='arrow-forward' size={30} />
                  </View>
                  <SliderCast actors={castSerie} setModalVisible={setModalVisible} setItemToShowInModal={setItemToShowInModal} />
                </View>
              }
              <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} item={itemToShowInModal} />
            </View>
        }
      </ScrollView>
    )
  }
  
  return data.title ? renderMoviesDetailScreen() : renderSeriesDetailScreen()
};

export default DetailScreen;

const styles = StyleSheet.create({
  containerTitle: {
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    marginTop: 15,
  },
  genres: {
    fontSize: 15,
    textAlign: 'center',
    color: 'gray',
    marginLeft: 10,
  },
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
  star: {
    fontSize: 20,
    width: 20,
    height: 20
  },
  dataMovieUp: {
    fontSize: 15,
    textAlign: 'center',
    color: 'gray',
    width: 70
  },
  dataMovieDown: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    width: 65,
    marginTop: 3
  },
  overview: {
    marginTop: 20,
    marginBottom: 10,
    color: 'gray',
  },
  screenshotsContainer: {
    marginTop: 20,
    paddingVertical: 10,
    marginBottom: 10
  },
  containerSecondaryTitleIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  secondaryTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
    width: 200,
  },
  seasons: {
    height: 220,
    width: 140,
    marginHorizontal: 7,
  },
  screenshots: {
    height: 110,
    width: 180,
    marginHorizontal: 7,
  },
  goBackButton: {
    position: 'absolute',
    zIndex: 1,
    padding: 13,
  },
  obscureBackground: {
    backgroundColor: '#d0d0d0'
  }
});