import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MainText from '../MainText/MainText'

const cellItem = (props) => (
  <View style={[styles.cellContainer, props.style]}>
    <MainText><Text style={styles.text}>{props.Text}</Text></MainText>
  </View>
);
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  cellContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 3,
    width: '100%'
  }
})
export default cellItem;