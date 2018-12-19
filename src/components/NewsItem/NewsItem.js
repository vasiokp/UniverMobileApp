import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { BACK_COLOR, BLOCK_BORDER_COLOR } from '../../plugins/AppColors';
import MainText from '../UI/MainText/MainText'
import moment from 'moment'

const newsItem = (props) => (
  <View style={styles.listItem}>
    <ImageBackground source={props.imgSource} style={styles.background}>
      <View style={styles.title}>
        <View style={styles.titleBlock}>
          <MainText><Text style={styles.titleText}>{props.title}</Text></MainText>
        </View>
        <View style={styles.dateBlock}>
          <MainText>{moment(props.date, "YYYY-MM-DD").format('YYYY-MM-DD')}</MainText>
        </View>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 230,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: BLOCK_BORDER_COLOR
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  title: {
    backgroundColor: BACK_COLOR,
    height: '40%',
    padding: 7
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dateBlock: {
    height: 30,
    alignItems: 'flex-end'
  },
  titleBlock: {
    height: '80%'
  }
})

export default newsItem;