import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchProps {
    onChangeText: any;
    userInput: string;
}


const SearchHeader = ({onChangeText, userInput}: SearchProps) => {

    const { goBack } = useNavigation();

    return (
        <View style={{ paddingHorizontal: 20, height: 100, alignItems: 'stretch', justifyContent: 'center', backgroundColor: '#000' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => goBack()} >
                    <Icon name='arrow-back' size={35} color='#fff' />
                </TouchableOpacity>

                <View style={styles.containerInput}>
                    <Icon name='search' size={25} color='#fff' style={{paddingLeft: 15}} />
                    <TextInput 
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={userInput}
                        placeholder="Search a movie or a serie"
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>
        </View>
    )
}

export default SearchHeader;

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 12,
        borderRadius: 50,
        width: '80%'
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        left: 10,
        height: 60,
        borderWidth: 1,
        borderColor: '#fff',
        width: '90%',
        borderRadius: 50
    }
})