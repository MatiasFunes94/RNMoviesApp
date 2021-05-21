import React from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { posterPath } from '../utils/images';
import FadeInImage from './FadeInImage';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  item?: any;
}

const ModalComponent = ({ modalVisible, setModalVisible, item }: Props) => {
  const renderLargeOverview = () => {
    return (
      <ScrollView contentContainerStyle={styles.modalView}>
        <Image source={{ uri: posterPath(item.poster_path) }} style={{ height: 250, width: 160 }} />
        <Text style={{ marginTop: 10, fontSize: 18 }} >{item.name}</Text>
        <Text>{item.overview}</Text>
      </ScrollView>
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
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(000,000,000,0.6)' }} onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            {
              item?.air_date || item?.episode_count ?
                (item.overview.length < 300 ?
                  <View style={styles.modalView}>
                    <FadeInImage uri={posterPath(item.poster_path)} style={{ height: 250, width: 160 }} />
                    <Text style={{ marginTop: 10, fontSize: 18 }} >{item.name}</Text>
                    <Text>{item.overview}</Text>
                  </View>
                  : renderLargeOverview())
                : item?.file_path ? <FadeInImage uri={posterPath(item.file_path)} style={{ height: 210, width: 360, marginBottom: 20 }} />
                  : item?.character ?
                    <View style={styles.modalView}>
                      {
                        item.profile_path && <FadeInImage uri={posterPath(item.profile_path)} style={{ height: 400, width: 250, marginBottom: 20 }} />
                      }
                      <Text style={{ fontSize: 20, textAlign: 'center', width: 200 }}>Name: {item.name}</Text>
                      <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10, width: 200 }}>Character: {item.character}</Text>
                      <Text style={{ width: 200, textAlign: 'center', fontSize: 18 }}>{item.known_for_department}</Text>
                    </View>
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 270,
    marginVertical: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#E50914",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
