import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import backgroundImage from '../../assets/t1.png'

const listItem = (props) => (
  <View style={styles.listItem}>
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.title}>
        <View style={styles.titleBlock}>
          <Text style={styles.titleText}>{props.title}</Text>
        </View>
        <View style={styles.dateBlock}>
          <Text style={styles.dateText}>{props.date}</Text>
        </View>
      </View>
    </ImageBackground>
  </View>

);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 230,
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  title: {
    backgroundColor: 'rgba(135, 135, 135, 0.6)',
    height: '40%',
    padding: 7
  },
  titleText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  dateText: {
    color: '#fff'
  },
  dateBlock: {
    height: 30,
    alignItems: 'flex-end'
  },
  titleBlock: {
    height: '80%'
  }
})

export default listItem;