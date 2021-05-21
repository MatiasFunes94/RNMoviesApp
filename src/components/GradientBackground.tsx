import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { color } from 'react-native-reanimated'
import { GradientContext } from '../context/gradientContext'

interface Props {
    children: JSX.Element | JSX.Element[]
}

const GradientBackground = ({ children }: Props) => {

    const { colors } = useContext( GradientContext );

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={[colors.primary, colors.secondary, 'lightblue']}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{ x: 0.1, y: 0.1}}
                end={{ x: 0.5, y: 0.7 }}
            />
            {children}
        </View>
    )
}

export default GradientBackground;