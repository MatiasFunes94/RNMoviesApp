import React from 'react';
import {
  FlatList,
  View,
  ViewStyle
} from 'react-native';
import { Cast } from '../interfaces/creditsInterface';
import Actor from './Actor';

interface Props {
  actors: Cast[],
  customStyles?: ViewStyle,
  setModalVisible: any;
  setItemToShowInModal: any;
}

const SliderCast = ({ actors, customStyles, setModalVisible, setItemToShowInModal }: Props) => {

  const actorWithProfilePath = actors.filter((actor) => actor.profile_path !== null)

  const renderItem = (item: Cast) => (
    <Actor
      actor={item}
      customStyles={customStyles}
      setModalVisible={setModalVisible}
      setItemToShowInModal={setItemToShowInModal}
    />
  )

  return (
    <FlatList
      data={actorWithProfilePath}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={(item) => String(item.id)}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default SliderCast;