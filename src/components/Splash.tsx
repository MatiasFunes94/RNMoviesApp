import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import SvgComponent from '../components/WaveSvg';

const SplashScreen = () => {

  const { navigate } = useNavigation();
  
  setTimeout(() => {
    navigate('Home')
  }, 3000);

  return (
    <View style={styles.containerSplash}>
      <SvgComponent
        urlPicture={require('../utils/imageSplash.png')}
      />
      <View style={styles.containerPlayButton}>
        <View
          style={styles.playButton}
        >
          <Icon
            name='play'
            size={30}
            color='#E50914'
            style={{ alignSelf: 'center' }}
          />
        </View>
      </View>
    </View>
  )
}

export default SplashScreen;

const styles = StyleSheet.create({
  containerSplash: {
    flex: 1,
    backgroundColor: '#9a0000'
  },
  containerPlayButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    top: 280
  },
  playButton: {
    height: 70,
    width: 70,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
  }
})