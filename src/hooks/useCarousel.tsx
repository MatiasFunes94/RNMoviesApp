import { useNavigation } from '@react-navigation/core';
import React, { useRef } from 'react'
import { Animated, Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

import { useMovies } from '../hooks/useMovies';
import { useSeries } from '../hooks/useSeries';
import { posterPath } from '../utils/images';

export const useCarousel = () => {

    const { nowPlaying } = useMovies();
    const { popularsSeries } = useSeries();
    const { navigate } = useNavigation();

    const { height, width } = Dimensions.get('screen');

    const imageW = width * 0.8;
    const imageH = height * 1.54;

    const scrollX = useRef(new Animated.Value(0)).current

    const carouselMovies = () => {
        return (
            <View style={{ position: 'absolute', top: 125 }}>
                <Carousel
                    data={nowPlaying}
                    renderItem={({ item }: any) => {
                        return <TouchableOpacity style={{ width, alignItems: 'center' }} activeOpacity={0.8} onPress={() => navigate('DetailScreen', item)}>
                            <Animated.Image
                                source={{ uri: posterPath(item.poster_path) }}
                                style={{ height: 450, width: imageW, resizeMode: 'cover', borderRadius: 16 }}
                            />
                        </TouchableOpacity>
                    }}
                    keyExtractor={(_, index) => String(index)}
                    sliderWidth={width}
                    itemWidth={width}
                    // autoplay
                    // autoplayDelay={500}
                    // autoplayInterval={3000}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )
                    }
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    <Icon name='arrow-up' size={35} color='#fff' />
                    <Text style={{ fontSize: 25, color: '#fff', width: 150, textAlign: 'center' }}>Swipe up</Text>
                </View>
            </View>
        )
    }

    const carouselSeries = () => {
        return (
            <View style={{ position: 'absolute', top: 125 }}>
                <Carousel
                    data={popularsSeries}
                    renderItem={({ item }: any) => {
                        return <TouchableOpacity style={{ width, alignItems: 'center' }} activeOpacity={0.8} onPress={() => navigate('DetailScreen', item)}>
                            <Animated.Image
                                source={{ uri: posterPath(item.poster_path) }}
                                style={{ height: 450, width: imageW, resizeMode: 'cover', borderRadius: 16 }}
                            />
                        </TouchableOpacity>
                    }}
                    keyExtractor={(_, index) => String(index)}
                    sliderWidth={width}
                    itemWidth={width}
                    // autoplay
                    // autoplayDelay={500}
                    // autoplayInterval={3000}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )
                    }
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    <Icon name='arrow-up' size={35} color='#fff' />
                    <Text style={{ fontSize: 25, color: '#fff', width: 150, textAlign: 'center' }}>Swipe up</Text>
                </View>
            </View>
        )
    }

    return {
        carouselMovies,
        carouselSeries,
        scrollX,
    }
}
