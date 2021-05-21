import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MoviesHome from '../screens/MoviesHome';
import SearchScreen from '../screens/SearchScreen';
import SeriesHome from '../screens/SeriesHome';
import Icon from 'react-native-vector-icons/Ionicons';
import MoviesHome2 from '../screens/MoviesHome2';
import MoviesHome3 from '../screens/MoviesHome3';

// const TopTabs = createMaterialTopTabNavigator();
const TopTabs = createBottomTabNavigator();

const TopTabsNavigator = () => {
  return (
    <TopTabs.Navigator
    sceneContainerStyle={{
      backgroundColor: '#fff'
    }}
    tabBarOptions={{
      activeTintColor: '#000',
      labelPosition: 'beside-icon',
      labelStyle: {
        fontSize: 15,
        color: '#fff',
        width: 50,
      },
      activeBackgroundColor: 'rgba(255,255,255,0.2)',
      style: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(000,000,000,0.7)',
        elevation: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        borderTopWidth: 0,
      }
    }}
    >
      {/* <TopTabs.Screen name="Movies" component={MoviesHome} /> */}
      {/* <TopTabs.Screen name="Movies" component={MoviesHome2} /> */}
      <TopTabs.Screen name="Movies" component={MoviesHome3} />
      <TopTabs.Screen
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: () => (
            <Icon
              color="#fff"
              size={20}
              name='search'
            />
          )
        }}
      name="Search" component={SearchScreen} />
      <TopTabs.Screen name="Series" component={SeriesHome} />
    </TopTabs.Navigator>
  );
}

export default TopTabsNavigator;