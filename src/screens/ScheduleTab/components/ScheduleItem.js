import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import classTypes from '../../../plugins/classTypes'

const scheduleItem = (props) => {
  const isCurrent = false
  const isNext = props.lessonNumber === -1
  return (
    <View style={[styles.listItem, isCurrent ? styles.currentListItem : {} ]}>
      <View style={[ styles.timeBlock, { borderColor: classTypes.getColor('CLASS') }]}>
        { (isCurrent || isNext) ? (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={isCurrent ? styles.currentLabel : styles.nextLabel}>
              <Text style={styles.labelText}>{isCurrent ? 'зараз' : 'наст. '}</Text>
            </View>
          </View>
         ) : null }
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={[ styles.timeText, styles.startTimeText ]}>11:11</Text>
          { (!isCurrent && !isNext) ? (
            <View style={{ height: 3 }}></View>
          ) : null }
          <Text style={[ styles.timeText, styles.endTimeText ]}>55:55</Text>
        </View>
      </View>
      <View style={styles.mainBlock}>
        <Text style={styles.title} numberOfLines={1}>{props.subjectName}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={styles.teacher}>Сопронюк Т. М.</Text>
          <Text style={styles.building}>корп. 1 ауд. 39</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: '#ddd'
  },
  currentListItem: {
    backgroundColor: '#fff'
  },
  timeBlock: {
    width: 52,
    paddingRight: 7,
    borderRightWidth: 2
  },
  timeText: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '300'
  },
  startTimeText: {
    color: '#222'
  },
  endTimeText: {
    color: '#777'
  },
  labelText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#fff',
    fontWeight: '300',
    paddingHorizontal: 4
  },
  currentLabel: {
    backgroundColor: 'rgb(83, 215, 105)',
    borderRadius: 5
  },
  nextLabel: {
    backgroundColor: '#afafaf',
    borderRadius: 5
  },
  mainBlock: {
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 17,
    fontWeight: '300',
    paddingTop: 2
  },
  teacher: {
    fontSize: 13,
    fontWeight: '300',
    color: '#777'
  },
  building: {
    fontSize: 13,
    fontWeight: '300',
    color: '#777'
  }
})

export default scheduleItem
