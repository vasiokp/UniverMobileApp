import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BLOCK_BORDER_COLOR } from '../../../plugins/AppColors'

const scheduleListItem = (props) => (
  <View style={styles.listItem}>
    <Text>{props.LessonNumber}</Text>
    {/* <ImageBackground source={props.imgSource} style={styles.background}>
      <View style={styles.title}>
        <View style={styles.titleBlock}>
          <MainText><Text style={styles.titleText}>{props.title}</Text></MainText>
        </View>
        <View style={styles.dateBlock}>
          <MainText>{props.date}</MainText>
        </View>
      </View>
    </ImageBackground> */}
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: BLOCK_BORDER_COLOR,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
  // background: {
  //   width: '100%',
  //   height: '100%',
  //   justifyContent: 'flex-end'
  // },
  // title: {
  //   backgroundColor: BACK_COLOR,
  //   height: '40%',
  //   padding: 7
  // },
  // titleText: {
  //   fontSize: 20,
  //   fontWeight: 'bold'
  // },
  // dateBlock: {
  //   height: 30,
  //   alignItems: 'flex-end'
  // },
  // titleBlock: {
  //   height: '80%'
  // }
})

export default scheduleListItem