import React from 'react'
import { 
  View,
  SectionList,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native'
import { groupBy, capitalize } from '../../../utils'
import TextButton from '../../../components/UI/TextButton'
import ScheduleListItem from './ScheduleListItem'
import moment from 'moment'

export default props => {
  const schedules = props.schedule.items.map(item => {
    return {
      item: item,
      date: moment(item.Date).date()
    }
  })
  const groups = groupBy(schedules, 'date')
  const sections = Object.keys(groups).map(key => {
    let title = capitalize(moment(groups[key][0].item.Date).format('dddd, D MMM'))
    let isToday = moment().date().toString() === key
    let data = groups[key].map((group, index) => {
      return {
        ...group.item,
        key: index.toString()
      }
    })
    data.sort((a, b) => a.LessonNumber - b.LessonNumber)
    return { title, data, isToday }
  })
  return (
    <SectionList stickySectionHeadersEnabled={false}
      sections={sections}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.6} onPress={() => props.openDetails(item.Id)}>
          <ScheduleListItem {...item}></ScheduleListItem>
        </TouchableOpacity>
      )}
      renderSectionHeader={({ section }) => (
        <View style={{
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 3
        }}>
          <Text style={{ color: section.isToday ? '#222' : '#666' }}>
            {section.title}
          </Text>
        </View>
      )}
      onRefresh={props.refresh}
      refreshing={props.schedule.loading}
      ItemSeparatorComponent={() => (
        <View style={{
          height: 1
        }}/>
      )}
      ListFooterComponent={() => (
        <View style={{
          paddingTop: 15,
          paddingBottom: 20,
          alignItems: 'center'
        }}>{props.schedule.extraLoading ?
          <ActivityIndicator style={{ marginTop: 10 }} size="small" color="#555" /> :
          !props.schedule.extraError ? <TextButton title="Більше" onPress={props.getMore}/> : null }
        </View>
      )}>
    </SectionList>
  )
}
