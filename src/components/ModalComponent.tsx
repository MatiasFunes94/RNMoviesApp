import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image
} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { imageUrl } from '../utils/images';
import FadeInImage from './FadeInImage';
import { Serie } from '../interfaces/serieDBinterface';
import { Movie } from '../interfaces/movieDBinterface';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  item?: any;
}

const ModalComponent = ({ modalVisible, setModalVisible, item }: Props) => {
  const renderOverview = (item: Movie | Serie) => {
    if (item.overview.length < 300) {
      return renderSmallOverview();
    }
    return renderLargeOverview();
  }

  const renderLargeOverview = () => (
    <ScrollView contentContainerStyle={styles.modalView}>
      <Image
        source={{ uri: imageUrl(item.poster_path) }}
        style={styles.overViewImage}
      />
      <Text style={styles.overViewText} >{item.name}</Text>
      <Text>{item.overview}</Text>
    </ScrollView>
  )

  const renderSmallOverview = () => (
    <View style={styles.modalView}>
      <FadeInImage
        uri={imageUrl(item.poster_path)}
        style={styles.overViewImage}
      />
      <Text style={styles.overViewText}>{item.name}</Text>
      <Text>{item.overview}</Text>
    </View>
  )

  const renderScreenshot = (item: Movie | Serie) => (
    <FadeInImage
      uri={imageUrl(item.file_path)}
      style={styles.screenshotStyle}
    />
  )

  const renderCast = (item: Movie | Serie) => {
    return (
      <View style={styles.modalView}>
        {
          item.profile_path &&
          <FadeInImage
            uri={imageUrl(item.profile_path)}
            style={styles.imageCast}
          />
        }
        <Text style={styles.nameCast}>Name: {item.name}</Text>
        <Text style={styles.characterCast}>Character: {item.character}</Text>
        <Text style={styles.departmentCast}>{item.known_for_department}</Text>
      </View>
    )
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        hardwareAccelerated
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable
          style={styles.pressableStyle}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            {
              item?.air_date || item?.episode_count ?
                renderOverview(item)
                : item?.file_path ?
                  renderScreenshot(item)
                  : item?.character ?
                    renderCast(item)
                    : null
            }
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default ModalComponent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10
  },
  pressableStyle: {
    flex: 1,
    backgroundColor: 'rgba(000,000,000,0.6)'
  },
  overViewImage: {
    height: 250,
    width: 160
  },
  overViewText: {
    marginTop: 10,
    fontSize: 18
  },
  screenshotStyle: {
    height: 210,
    width: 360,
    marginBottom: 20
  },
  imageCast: {
    height: 400,
    width: 250,
    marginBottom: 20,
    marginTop: 7,
  },
  nameCast: {
    fontSize: 20, 
    textAlign: 'center', 
    width: 200
  },
  characterCast: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    width: 200
  },
  departmentCast: {
    width: 200,
    textAlign: 'center',
    fontSize: 18
  }
});
