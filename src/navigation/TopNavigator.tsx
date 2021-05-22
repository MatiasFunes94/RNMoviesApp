import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import MoviesHomeBlured from '../screens/MoviesHome';
import SeriesHome from '../screens/SeriesHome';
import Icon from 'react-native-vector-icons/Ionicons';
import SeriesHomeAlternative from '../screens/SeriesHomeAlternative';

//Alternatives
import MoviesHomeAlternative from '../screens/MoviesHomeAlternative';
import SearchScreen from '../screens/SearchScreen';

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
      labelStyle: styles.tabBarOpt_labelStyle,
      activeBackgroundColor: 'rgba(255,255,255,0.2)',
      style: styles.tabBarOpt_style,
    }}
    >
      <TopTabs.Screen name="Movies" component={MoviesHomeBlured} />
      {/* <TopTabs.Screen name="Movies" component={MoviesHomeAlternative} /> */}
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
      {/* <TopTabs.Screen name="Series" component={SeriesHomeAlternative} /> */}
    </TopTabs.Navigator>
  );
}

export default TopTabsNavigator;

const styles = StyleSheet.create({
  tabBarOpt_labelStyle: {
    fontSize: 15,
    color: '#fff',
    width: 50,
  },
  tabBarOpt_style: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(000,000,000,0.7)',
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderTopWidth: 0,
  }
})