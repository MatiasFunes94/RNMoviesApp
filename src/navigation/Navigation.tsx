import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';
import { Movie } from '../interfaces/movieDBinterface';
import YoutubePlayerComponent from '../components/YoutubePlayer';

export type RootStackParams = {
  Home: undefined;
  DetailScreen: Movie;
  SearchScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}

export default Navigation;
