import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import classTypes from '../../../plugins/classTypes'
import * as userRoles from '../../../plugins/userRoles'

const pendingIcon = require('../../../assets/pending.png')
const completedIcon = require('../../../assets/completed.png')
const currentIcon = require('../../../assets/current.png')

const scheduleItem = (props) => {
  const icon = props.moment === -1 ? completedIcon : props.moment === 0 ? currentIcon : props.moment === 1 ? pendingIcon : null
  return (
    <View style={[styles.listItem, !props.isMyLesson ? styles.notMyLesson : {}]}>
      <View style={[ styles.timeBlock, { borderColor: classTypes.getColor(props.ScheduleTypeName) }]}>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={[ styles.timeText, styles.startTimeText ]}>{props.Start.substr(0, 5)}</Text>
          <View style={{ height: 3 }}></View>
          <Text style={[ styles.timeText, styles.endTimeText ]}>{props.End.substr(0, 5)}</Text>
        </View>
      </View>
      <View style={styles.mainBlock}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={[styles.title, { flex: 1 }]} numberOfLines={1}>{props.SubjectName}</Text>
          {icon ? <Image style={{ width: 18, height: 18, marginLeft: 3 }} source={icon}/> : null}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={[styles.teacher, { flex: 1, marginRight: 8 }]} numberOfLines={1}>
            {props.userRole === userRoles.STUDENT ? props.TeacherName : (
              (props.subSchedules && props.subSchedules.length > 1) ? `групи ${props.subSchedules.map(s => s.GroupName).join(', ')}` : `група ${props.GroupName}`
            )}
          </Text>
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
  notMyLesson: {
    backgroundColor: '#eee'
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
