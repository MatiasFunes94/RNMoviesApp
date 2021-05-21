import React, { useRef } from 'react'
import { View, FlatList, Dimensions, Image, Animated } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, { Rect } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

import { useMovies } from '../hooks/useMovies';
import { imageUrl } from '../utils/images';

const CarouselNew = () => {

    const {height, width} = Dimensions.get('screen');

    const ITEM_SIZE =  width * 0.72;
    const SPACE_ITEM_SIZE = (width - 250) / 2;

    const { nowPlaying } = useMovies();
    const scrollX = useRef(new Animated.Value(0)).current;

    const renderItem = (item, index) => {
        if (!item.poster_path) {
            return <View style={{ width: SPACE_ITEM_SIZE }} />
        }
        const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
        ]
        const translateY = scrollX?.interpolate({
            inputRange,
            outputRange: ['0', '-50', '0']
        })
        return (
            <Animated.View
                style={{
                    width: ITEM_SIZE,
                    height: 550,
                    transform: [{ translateY }],
                    justifyContent: 'center'
                }}
                >
                <Image
                    source={{ uri: imageUrl(item.poster_path) }}
                    style={{ height: 400, width: 250, margin: 10, borderRadius: 30 }}
                />
            </Animated.View>
        )
    }

    const Backdrop = ({ movies, scrollX }) => {
        return (
            <View style={{ position: 'absolute', width, height: height * 0.8 }}>
                <FlatList
                data={movies}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index}) => {
                    return (
                        // <MaskedView
                        //     style={{ backgroundColor: 'green' }}
                        //     maskElement={
                        //         <Image
                        //         source={{ uri: posterPath(item.backdrop_path) }}
                        //         style={{
                        //             width: 500,
                        //             height: height * 0.6,
                        //             resizeMode: 'cover',
                        //         }}
                        //     />
                        //     }
                        // >
                             
                        // </MaskedView>
                        <View>
                            <Image
                                source={{ uri: imageUrl(item.backdrop_path) }}
                                style={{
                                    width: 500,
                                    height: height * 0.6,
                                    resizeMode: 'cover',
                                }}
                            />
                        </View>
                    )
                }}
                />
            </View>
        )
    }

    return (
        <View>
            <Backdrop movies={nowPlaying} scrollX={scrollX} />
            <Animated.FlatList 
            showsHorizontalScrollIndicator={false}
            data={nowPlaying}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item, index }) => renderItem(item, index)}
            decelerationRate={0}
            bounces={false}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            />
        </View>
    )
}

export default CarouselNew;