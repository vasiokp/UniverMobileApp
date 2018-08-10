import React from 'react'
import { View } from 'react-native'
import Cell from './Cell'
import { PRIMARY_COLOR } from '../../plugins/AppColors'
const lessonItem = (props) => (
  <View style={{ flexDirection: 'row', height: 33 }}>
    <Cell style={{
      borderColor: PRIMARY_COLOR,
      width: 27,
    }}
      Text={props.FirstColumn} />
    <Cell style={{
      borderColor: PRIMARY_COLOR,
      width: '60%'
    }}
      Text={props.SecondColumn} />
    <Cell style={{
      borderColor: PRIMARY_COLOR,
      width: '33%'
    }}
      Text={props.ThirdColumn} />
  </View>
);

export default lessonItem;