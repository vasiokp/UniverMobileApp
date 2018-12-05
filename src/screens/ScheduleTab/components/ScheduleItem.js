import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import classTypes from '../../../plugins/classTypes'

const scheduleItem = (props) => {
  return (
    <View style={styles.listItem}>
      <View style={[ styles.timeBlock, { borderColor: classTypes.getColor(props.ScheduleTypeName) }]}>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={[ styles.timeText, styles.startTimeText ]}>{props.Start.substr(0, 5)}</Text>
          <View style={{ height: 3 }}></View>
          <Text style={[ styles.timeText, styles.endTimeText ]}>{props.End.substr(0, 5)}</Text>
        </View>
      </View>
      <View style={styles.mainBlock}>
        <Text style={styles.title} numberOfLines={1}>{props.SubjectName}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={styles.teacher}>{props.Teacher}</Text>
          <Text style={styles.building}>{props.BuildingName ? `корп. ${props.BuildingName}` : ''} {props.AuditoryName ? `ауд. ${props.AuditoryName}` : ''}</Text>
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
    backgroundColor: '#F89554',
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
