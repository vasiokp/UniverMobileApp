import React from 'react'
import { View } from 'react-native'
import Cell from './Cell'
const lessonItem = (props) => (
  <View style={{ flexDirection: 'row', height: 33 }}>
    <Cell CellStyle={{
      borderWidth: 1,
      borderColor: '#de793e',
      padding: 3,
      width: '7%',
    }}
      TextStyle={{ fontSize: 18, color: props.TextColor }}
      Text={props.LessonNumber} />
    <Cell CellStyle={{
      borderWidth: 1,
      borderColor: '#de793e',
      padding: 3,
      width: '60%'
    }}
      TextStyle={{ fontSize: 18, color: props.TextColor }}
      Text={props.Teacher} />
    <Cell CellStyle={{
      borderWidth: 1,
      borderColor: '#de793e',
      padding: 3,
      width: '33%'
    }}
      TextStyle={{ fontSize: 18, color: props.TextColor }}
      Text={props.Auditory} />
  </View>
);

export default lessonItem;