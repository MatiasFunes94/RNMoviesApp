import React from 'react'
import { FlatList, Image, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { imageUrl } from '../utils/images';

interface Props {
  customStyles?: ViewStyle,
  data: any;
  setModalVisible: any;
  setItemToShowInModal: any;
}

const renderScreenshot = (item, customStyles, setModalVisible, setItemToShowInModal) => {

  const showModal = () => {
    setItemToShowInModal(item)
    setModalVisible(true)
  }
  return (
    <TouchableOpacity style={[customStyles]} activeOpacity={0.8} onPress={showModal}>
      <View style={styles.imageContainer}>
        {
          item.file_path ? <Image source={{ uri: imageUrl(item?.file_path) }} style={styles.poster} />
            : <Image source={{ uri: imageUrl(item?.poster_path) }} style={styles.poster} />
        }
      </View>
    </TouchableOpacity>
  )
}

const SliderScreenshots = ({ customStyles, data, setModalVisible, setItemToShowInModal }: Props) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }: any) => renderScreenshot(item, customStyles, setModalVisible, setItemToShowInModal)}
        keyExtractor={(item, index) => String(index)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default SliderScreenshots;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  poster: {
    flex: 1,
    borderRadius: 10,
  },
})