import React, { Component } from 'react'
import { View, SectionList, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
// import { getSchedule, getExtraSchedule } from '../../store/actions/index'
import moment from 'moment'
// import LoadingView from '../../components/UI/LoadingView'
import PageLayout from '../../../components/UI/PageLayout/PageLayout'
import classTypes from '../../../plugins/classTypes'
import { capitalize } from '../../../utils'

class ScheduleDetails extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // this.getSchedule()
  }

  render() {
    const sections = [
      {
        data: [
          {
            key: 'title',
            template: () => (
              <Text style={{ fontSize: 20 }} numberOfLines={3}>Диференціальні рівняння</Text>
            )
          },
          {
            key: 'type',
            template: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: classTypes.getColor('CLASS') }}></View>
                <Text style={{ marginLeft: 10 }}>Лекція</Text>
              </View>
            )
          },
          {
            key: 'time',
            template: () => (
              <Text>08:20 – 09:40</Text>
            )
          },
          {
            key: 'date',
            template: () => (
              <Text>{capitalize(moment().format('dddd, D MMMM YYYY'))}</Text>
            )
          },
          {
            key: 'teacher',
            template: () => (
              <Text>Сопронюк Тетяна Миколаївна</Text>
            )
          },
          {
            key: 'building',
            template: () => (
              <Text>1 корпус, 39 аудиторія</Text>
            )
          }
        ]
      },
      {
        title: 'Нотатки',
        data: [
          {
            key: 'note',
            template: () => (
              <TextInput placeholder="Нотатки"
                height={120}
                color="#333"
                fontSize={16}
                multiline={true} />
            )
          }
        ]
      }
    ]
    return (
      <PageLayout>
        <View style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', height: '100%'}}>
          <SectionList stickySectionHeadersEnabled={false}
            sections={sections}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 10 }}>
                {item.template()}
              </View>
            )}
            renderSectionHeader={({ section }) => (
              <View style={{
                paddingTop: 20,
                paddingHorizontal: 20,
                paddingBottom: 3
              }}>
                <Text style={{ color: '#666' }}>
                  {section.title}
                </Text>
              </View>
            )}
            onRefresh={() => {}}
            refreshing={false}
            ItemSeparatorComponent={() => (
              <View style={{
                height: 1
              }}/>
            )}
            ListFooterComponent={() => (
              <View style={{}}></View>
            )}>
          </SectionList>
        </View>
      </PageLayout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getSchedule: (start, end, refresh) => dispatch(getSchedule(start, end, refresh)),
    // getExtraSchedule: () => dispatch(getExtraSchedule())
  }
}

const mapStateToProps = state => {
  return {
    // schedule: state.schedule
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetails)
