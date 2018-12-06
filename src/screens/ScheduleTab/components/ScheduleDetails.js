import React, { Component } from 'react'
import { View, SectionList, Text, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
import { fetchScheduleDetails, updateScheduleDetails } from  '../../../store/actions/index'
import moment from 'moment'
import classTypes from '../../../plugins/classTypes'
import { capitalize } from '../../../utils'

const refreshInterval = 30000 // 30 seconds

const pendingIcon = require('../../../assets/pending.png')
const completedIcon = require('../../../assets/completed.png')
const currentIcon = require('../../../assets/current.png')

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
    this.props.fetchScheduleDetails(this.props.passedItem.Id)
    const intervalId = setInterval(() => {
      this.props.updateScheduleDetails()
    }, refreshInterval)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  refresh() {
    this.props.fetchScheduleDetails(this.props.passedItem.Id, true)
    this.props.updateScheduleDetails()
  }

  render() {
    const ScheduleType = this.props.scheduleTypes.items.find(st => st.Name === this.props.passedItem.ScheduleTypeName)
    const details = this.props.scheduleDetails.loading ? {
      ...this.props.passedItem,
      ScheduleType,
    } : {
      ...this.props.passedItem,
      ScheduleType,
      moment: this.props.scheduleDetails.item.moment
    }
    const icon = details.moment === -1 ? completedIcon : details.moment === 0 ? currentIcon : details.moment === 1 ? pendingIcon : null
    const sections = [
      {
        data: [
          {
            key: 'details',
            template: () => (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ paddingTop: 4, alignItems: 'center', paddingRight: 18 }}>
                  <Text style={{ fontWeight: '200', fontSize: 38, color: '#7a92a5' }}>
                    {details.LessonNumber}
                  </Text>
                  {icon ? <Image style={{ marginTop: 3, width: 18, height: 18}} source={icon}/> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 20, fontWeight: '300', paddingTop: 7}} numberOfLines={3}>
                    {details.SubjectName}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <View style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: classTypes.getColor(details.ScheduleTypeName)
                    }}/>
                    <Text style={{
                      marginLeft: 10,
                      fontWeight: '300',
                      fontSize: 13,
                      color: '#555'
                    }}>
                      {details.ScheduleType ? details.ScheduleType.Description : ''}
                    </Text>
                  </View>
                  <Text style={{ marginTop: 15, fontWeight: '300' }}>
                    {details.Start.substr(0, 5)} - {details.End.substr(0, 5)}
                  </Text>
                  <Text style={{ fontWeight: '300', fontSize: 13, color: '#666', marginTop: 4 }}>
                    {capitalize(moment(details.Date, 'YYYY-MM-DD').format('dddd, D MMMM YYYY'))}
                  </Text>
                  <Text style={{ fontWeight: '300', marginTop: 14, fontSize: 15 }}>
                    {details.Teacher ? details.Teacher.Description : ''}
                  </Text>
                  <Text style={{ fontWeight: '300', color: '#666', marginBottom: 10, marginTop: 8 }}>
                    {details.BuildingName ? `${details.BuildingName} корпус` : ''}, {details.AuditoryName ? `${details.AuditoryName} аудиторія` : ''}
                  </Text>
                  <Text style={{ fontWeight: '300', color: '#666', marginBottom: 10, marginTop: 8 }}>
                    {details.BuildingName ? `${details.BuildingName} корпус` : ''}, {details.AuditoryName ? `${details.AuditoryName} аудиторія` : ''}
                  </Text>
                </View>
              </View>
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
                underlineColorAndroid="#fff"
                style={{color:'#333'}}
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
          onRefresh={() => this.refresh()}
          refreshing={this.props.scheduleDetails.refreshing}>
        </SectionList>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchScheduleDetails: (id, refresh = false) => dispatch(fetchScheduleDetails(id, refresh)),
    updateScheduleDetails: () => dispatch(updateScheduleDetails())
  }
}

const mapStateToProps = state => {
  return {
    scheduleTypes: state.scheduleTypes,
    scheduleDetails: state.scheduleDetails
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetails)
