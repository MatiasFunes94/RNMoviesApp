import React from 'react'
import { StatusBar, View } from 'react-native'
import TopTabsNavigator from '../navigation/TopNavigator'

export default () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <TopTabsNavigator />
    </View>
  )
}
