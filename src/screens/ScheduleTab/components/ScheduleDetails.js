import React, { Component } from 'react'
import { View, SectionList, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { fetchScheduleDetails } from  '../../../store/actions/index'
import moment from 'moment'
// import LoadingView from '../../components/UI/LoadingView'
import classTypes from '../../../plugins/classTypes'
import { capitalize } from '../../../utils'

class ScheduleDetails extends Component {
  static navigatorButtons = {
    rightButtons: [{
      title: 'Зберегти',
      id: 'save',
      disabled: true
    }]
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchScheduleDetails(this.props.Id)
  }

  render() {
    const scheduleType = this.props.scheduleTypes.items.find(st => st.Name === this.props.ScheduleTypeName)
    console.log(this.props.scheduleDetails.items)
    const sections = [
      {
        title: `${this.props.LessonNumber} пара`,
        data: [
          {
            key: 'title',
            template: () => (
              <Text style={{
                fontSize: 20,
                fontWeight: '300',
                paddingTop: 7
              }} numberOfLines={3}>
                {this.props.SubjectName}
              </Text>
            )
          },
          {
            key: 'type',
            template: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: classTypes.getColor(this.props.ScheduleTypeName)
                }}/>
                <Text style={{
                  marginLeft: 10,
                  fontWeight: '300',
                  fontSize: 13,
                  color: '#555'
                }}>
                  {scheduleType ? scheduleType.Description : ''}
                </Text>
              </View>
            )
          },
          {
            key: 'time',
            template: () => (
              <Text style={{
                paddingTop: 10,
                fontWeight: '300'
              }}>
                {this.props.Start.substr(0, 5)} - {this.props.End.substr(0, 5)}
              </Text>
            )
          },
          {
            key: 'date',
            template: () => (
              <Text style={{
                fontWeight: '300',
                fontSize: 13,
                color: '#666',
                marginTop: -5
              }}>
                {capitalize(moment(this.props.Date, 'YYYY-MM-DD').format('dddd, D MMMM YYYY'))}
              </Text>
            )
          },
          {
            key: 'teacher',
            template: () => (
              <Text style={{
                paddingTop: 10,
                fontWeight: '300'
              }}>
                {this.props.Teacher}
              </Text>
            )
          },
          {
            key: 'building',
            template: () => (
              <Text style={{
                fontWeight: '300',
                color: '#666',
                paddingBottom: 10
              }}>
                {this.props.BuildingName ? `${this.props.BuildingName} корпус` : ''}, {this.props.AuditoryName ? `${this.props.AuditoryName} аудиторія` : ''}
              </Text>
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
              <TextInput placeholder="Ваш текст..."
                height={120}
                color="#333"
                fontWeight="300"
                fontSize={16}
                multiline={true} />
            )
          }
        ]
      }
    ]
    return (
      <View style={{backgroundColor: '#f4f4f4', height: '100%'}}>
        <SectionList stickySectionHeadersEnabled={false}
          sections={sections}
          renderItem={({ item }) => (
            <View style={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              paddingVertical: 5
            }}>
              {item.template()}
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              paddingBottom: 3
            }}>
              <Text style={{ color: '#7a92a5', fontWeight: '300' }}>
                {section.title}
              </Text>
            </View>
          )}
          onRefresh={() => {}}
          refreshing={false}
          ItemSeparatorComponent={() => (
            <View style={{
              height: 0
            }}/>
          )}
          ListFooterComponent={() => (
            <View style={{}}></View>
          )}>
        </SectionList>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchScheduleDetails: (id, refresh = false) => dispatch(fetchScheduleDetails(id, refresh))
  }
}

const mapStateToProps = state => {
  return {
    scheduleTypes: state.scheduleTypes,
    scheduleDetails: state.scheduleDetails
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetails)
