import React from 'react'
import {
  FlatList,
  Text,
  View,
  ViewStyle,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import RenderImage from './RenderImage'

interface Props {
  title?: string,
  data?: any,
  customStyles?: ViewStyle,
}

const SliderMovie = ({ title, data, customStyles, }: Props) => {
  return (
    <View style={styles.containerSlider}>
      <View style={styles.containerSection}>
        <Text style={styles.title}>{title}</Text>
        <Icon name='arrow-forward' size={30} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }: any) => <RenderImage data={item} customStyles={customStyles} />}
        keyExtractor={(item) => String(item.id)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default SliderMovie;

const styles = StyleSheet.create({
  containerSlider: {
    height: 280,
    flex: 0.4,
    marginBottom: 10
  },
  containerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    width: 250,
  }
})