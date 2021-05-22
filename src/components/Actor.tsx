import React from 'react'
import {
  Text,
  StyleSheet,
  ViewStyle
} from 'react-native';
import { smallImages } from '../utils/images';
import { Cast } from '../interfaces/creditsInterface';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FadeInImage from './FadeInImage';

interface Props {
  actor: Cast;
  customStyles?: ViewStyle;
  setModalVisible: any;
  setItemToShowInModal: any;
}

export const Actor = ({ actor, setModalVisible, setItemToShowInModal }: Props) => {
  const showModal = () => {
    setItemToShowInModal(actor)
    setModalVisible(true)
  }
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.actorContainer} onPress={showModal}>
      <FadeInImage uri={smallImages(actor.profile_path)} style={styles.photo} />
      <Text numberOfLines={3} style={styles.actorName}>{actor.name}</Text>
      <Text numberOfLines={6} style={styles.actorCharacter}>{actor.character}</Text>
    </TouchableOpacity>
  )
}

export default Actor;

const styles = StyleSheet.create({
  actorContainer: {
    height: 150,
    width: 90,
    paddingHorizontal: 5,
  },
  actorName: {
    textAlign: 'center',
    marginBottom: 5,
  },
  actorCharacter: {
    textAlign: 'center',
    color: 'gray'
  },
  photo: {
    height: 60,
    width: 60,
    borderRadius: 50,
    alignSelf: 'center',
  }
})