import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { smallImages } from '../utils/images';
import { Movie } from '../interfaces/movieDBinterface';
import { Serie } from '../interfaces/serieDBinterface';

interface Props {
    data?: [];
}

interface Item {
    backdrop_path: string;
    title: string;
}

const popularItem = ({ backdrop_path, title }: Item) => {
    return (
        <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Image source={{ uri: smallImages(backdrop_path) }} style={{height: 80, width: 140}} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
                <Text style={{ width: '65%', marginLeft: 10 }}>{title}</Text>
                <Icon name='arrow-forward-circle-outline' size={35} color='#000' />
            </View>
        </View>
    )
}

export const PopularsInSearchScreen = ({ data }: Props) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }: any) => popularItem(item)}
            keyExtractor={(item, index) => String(index)}
        />
    )
}



export default PopularsInSearchScreen;