import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import { FlatList, Image, ScrollView, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchHeader from '../components/SearchHeader';
import { RootStackParams } from '../navigation/Navigation';
import { posterPath, smallImages } from '../utils/images';
import { useMultiSearch } from '../hooks/useMultiSearch';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { useMovies } from '../hooks/useMovies';

interface Props extends StackScreenProps<RootStackParams, 'SearchScreen'>{};

interface Props {
    data?: [];
}

const popularItem = ( data, handleNavigate ) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 2, backgroundColor: '#ebecf0' }} onPress={() => handleNavigate('DetailScreen', data)}>
            <Image source={{ uri: smallImages(data.backdrop_path) }} style={{ height: 80, width: 140 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                <Text style={{ width: '65%', marginLeft: 10, fontSize: 16 }}>{data.title || data.name}</Text>
                <Icon name='arrow-forward-circle-outline' size={35} color='#000' style={{ marginRight: 10 }} />
            </View>
        </TouchableOpacity>
    )
}

const listMostViewed = (data, handleNavigate) => {
    return (
        <View style={{ paddingBottom: 320 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, marginVertical: 10, paddingLeft: 10 }}>Most viewed</Text>
            <FlatList
                data={data}
                renderItem={({ item }: any) => popularItem(item, handleNavigate)}
                keyExtractor={(item, index) => String(index)}
            />
        </View>
    )
}

const listMoviesSearched = (multiSearch, handleNavigate) => {
    return (
        <ScrollView>
        <Text style={{ fontWeight: 'bold', fontSize: 25, marginVertical: 10, paddingLeft: 10 }}>Movies and Series</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', paddingBottom: 100 }}>
            {
                multiSearch!.map((item, index) => {
                    if (item.poster_path) {
                        return (
                            <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => handleNavigate('DetailScreen', item)}>
                                <Image source={{ uri: posterPath(item.poster_path) }} style={{ height: 180, width: 125, margin: 2 }} />
                            </TouchableOpacity>
                        )
                    } else {
                        return (
                            <TouchableOpacity activeOpacity={0.5} key={index} style={styles.textSearched} onPress={() => handleNavigate('DetailScreen', item)}>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                                    <Icon name='information-circle-outline' size={35} color='#000' style={{marginRight: 10}} />
                                    <Text>Poster not found</Text>
                                </View>
                                <Text numberOfLines={10} style={{textAlign: 'center'}}>{item.title || item.name}</Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }
        </View>
        </ScrollView>
    )
}

export const SearchScreen = ({ route }: Props) => {
     
    const [userInput, onChangeText] = useState('')

    const { isLoadingSearch, multiSearch } = useMultiSearch(userInput);
    const { navigate } = useNavigation();

    const handleNavigate = (route: string, data) => {
        navigate(route, data);
    }
    
    const { nowPlaying } = useMovies();

    return (
        <View>
            <View style={{ paddingTop: 50, backgroundColor: '#000' }} />
            <SearchHeader onChangeText={onChangeText} userInput={userInput} />
            {
                multiSearch.length > 0 ? 
                listMoviesSearched(multiSearch, handleNavigate) :
                listMostViewed(nowPlaying, handleNavigate)
            }
        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    textSearched: {
        height: 180, 
        width: 125, 
        margin: 2, 
        justifyContent: 'center'
    },
})