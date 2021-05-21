import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native'
import { posterPath } from '../utils/images';
import { useNavigation } from '@react-navigation/core';
import { Backdrop } from '../interfaces/movieFullDetailInterface';

interface Props {
    data: any,
    customStyles?: ViewStyle,
}

export default ({ data, customStyles }: Props) => {
    const navigation = useNavigation();
    const handleOnPress = () => {
        return navigation.navigate('DetailScreen', data)
    }
    return (
        <TouchableOpacity style={[styles.shadow, customStyles]} activeOpacity={0.8} onPress={handleOnPress}>
            <View style={styles.imageContainer}>
                {
                    data.file_path ? <Image source={{ uri: posterPath(data?.file_path) }} style={styles.poster} />
                    : <Image source={{ uri: posterPath(data?.poster_path) }} style={styles.poster} />
                }
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
    },
    poster: {
        flex: 1,
        borderRadius: 10,
    },
    shadow: {
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        // elevation: 5,
        // borderRadius: 10
    }
})