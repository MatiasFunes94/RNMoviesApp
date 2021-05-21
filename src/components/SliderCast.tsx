import React from 'react'
import { FlatList, Text, View, ViewStyle } from 'react-native'
import { Cast } from '../interfaces/creditsInterface';
import Actor from './Actor';

interface Props {
    actors: Cast[],
    customStyles?: ViewStyle,
    setModalVisible: any;
    setItemToShowInModal: any;
}

const SliderCast = ({ actors, customStyles, setModalVisible, setItemToShowInModal }: Props) => {

    const actorWithProfilePath = actors.filter((actor) => actor.profile_path !== null  )

    return (
        <View style={{ height: 280, flex: 0.4 }}>
            <FlatList
                data={actorWithProfilePath}
                renderItem={({ item }: any) => <Actor actor={item} customStyles={customStyles} setModalVisible={setModalVisible} setItemToShowInModal={setItemToShowInModal} />}
                keyExtractor={(item) => String(item.id)}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default SliderCast;