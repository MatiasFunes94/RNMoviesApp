import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MoviesHomeBlured from '../screens/MoviesHome';
import SeriesHome from '../screens/SeriesHome';
import SearchScreen from '../screens/SearchScreen';

//Alternatives
import MoviesHomeAlternative from '../screens/MoviesHomeAlternative';
import SeriesHomeAlternative from '../screens/SeriesHomeAlternative';

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
      activeBackgroundColor: 'rgba(255,255,255,0.15)',
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
    backgroundColor: 'rgba(000,000,000,0.9)',
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderTopWidth: 0,
  }
})