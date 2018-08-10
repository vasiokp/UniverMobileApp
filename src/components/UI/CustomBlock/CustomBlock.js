import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BLOCK_BORDER_COLOR, BACK_COLOR } from '../../../plugins/AppColors'

const customBlock = (props) => (
  <View style={[styles.block, props.style]}>
    {props.children}
  </View>
);
const styles = StyleSheet.create({
  block: {
    padding: 10,
    margin: 10,
    flex: 1,
    borderWidth: 1,
    backgroundColor: BACK_COLOR,
    borderColor: BLOCK_BORDER_COLOR
  }
})
export default customBlock;