import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const loadingView = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="small" color="#555"></ActivityIndicator>
    </View>
  )
}

export default loadingView
