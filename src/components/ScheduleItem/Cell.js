import React from 'react'
import { View, Text } from 'react-native'

const cellItem = (props) => (
  <View style={props.CellStyle}>
    <Text style={props.TextStyle}>{props.Text}</Text>
  </View>
);

export default cellItem;