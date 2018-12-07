import React, { Component } from 'react'
import { View, ScrollView, SectionList, Text, TextInput, Image, ActivityIndicator, Keyboard, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { fetchScheduleDetails, updateScheduleDetails, addNote, updateNote } from  '../../../store/actions/index'
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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.state = {
      noteText: ''
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'save') {
        this.noteInput.blur()
        this.enableSaveButton(false)
        if (this.props.scheduleDetails.item.Note) {
          this.props.updateNote({
            ...this.props.scheduleDetails.item.Note,
            ScheduleId: this.props.passedItem.Id,
            Text: this.state.noteText
          })
        } else {
          this.props.addNote({
            ScheduleId: this.props.passedItem.Id,
            Text: this.state.noteText
          })
        }
      }
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
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
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow () {
    this.scroller.scrollToEnd({ animated: true })
  }

  _keyboardDidHide () {
    this.scroller.scrollTo({ y: 0, animated: true })
  }

  refresh() {
    this.props.fetchScheduleDetails(this.props.passedItem.Id, true)
    this.props.updateScheduleDetails()
  }

  onNoteTextChange(text) {
    this.setState({ noteText: text })
    if (this.props.scheduleDetails.item.Note) {
      if (this.props.scheduleDetails.item.Note.Text !== text) {
        this.enableSaveButton(true)
      } else {
        this.enableSaveButton(false)
      }
    } else if (text !== '') {
      this.enableSaveButton(true)
    } else {
      this.enableSaveButton(false)
    }
  }

  enableSaveButton(enabled) {
    this.props.navigator.setButtons({
      rightButtons: [{
        ...ScheduleDetails.navigatorButtons.rightButtons[0],
        disabled: !enabled
      }]
    })
  }

  render() {
    const ScheduleType = this.props.scheduleTypes.items.find(st => st.Name === this.props.passedItem.ScheduleTypeName)
    const details = {
      ...this.props.passedItem,
      ScheduleType,
      moment: this.props.scheduleDetails.item.moment,
      TeacherDescription: this.props.scheduleDetails.item.Teacher ? this.props.scheduleDetails.item.Teacher.Description : '',
      BuildingAddress: this.props.scheduleDetails.item.Auditory && this.props.scheduleDetails.item.Auditory.Building ? this.props.scheduleDetails.item.Auditory.Building.Description : '',
      GroupName: this.props.scheduleDetails.item.Group ? this.props.scheduleDetails.item.Group.Name : '',
      NoteText: this.props.scheduleDetails.item.Note ? this.props.scheduleDetails.item.Note.Text : ''
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
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 7 }}>
                    <Text style={{ fontSize: 20, fontWeight: '300' }} numberOfLines={3}>
                      {details.SubjectName}
                    </Text>
                    {this.props.scheduleDetails.loading ? <ActivityIndicator size='small' style={{ paddingTop: 3 }} /> : null}
                  </View>
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
                  {details.GroupName ? <Text style={{ fontWeight: '300', marginTop: 14, fontSize: 15 }}>
                    {`група ${details.GroupName}`}
                  </Text> : null}
                  <Text style={{ fontWeight: '300', marginTop: 14, fontSize: 15 }}>
                    {details.TeacherDescription}
                  </Text>
                  <Text style={{ fontWeight: '300', color: '#666', marginTop: 10 }}>
                    {details.BuildingName ? `${details.BuildingName} корпус` : ''}, {details.AuditoryName ? `${details.AuditoryName} аудиторія` : ''}
                  </Text>
                  <Text style={{ fontWeight: '300', fontSize: 13, color: '#666', marginBottom: 10, marginTop: 4 }}>
                    {details.BuildingAddress}
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
                ref={noteInput => this.noteInput = noteInput}
                value={details.NoteText}
                height={120}
                underlineColorAndroid="#fff"
                style={{ color:'#333' }}
                fontWeight="300"
                fontSize={16}
                multiline={true}
                onChangeText={text => this.onNoteTextChange(text)} />
            )
          }
        ]
      }
    ]
    return (
      <ScrollView ref={scroller => this.scroller = scroller}
        style={{backgroundColor: '#f4f4f4', flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.props.scheduleDetails.refreshing}
            onRefresh={() => this.refresh()}
          />
        }>
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
          ListFooterComponent={() => (
            <View style={{ height: 270 }} />
          )}>
        </SectionList>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchScheduleDetails: (id, refresh = false) => dispatch(fetchScheduleDetails(id, refresh)),
    updateScheduleDetails: () => dispatch(updateScheduleDetails()),
    addNote: note => dispatch(addNote(note)),
    updateNote: note => dispatch(updateNote(note))
  }
}

const mapStateToProps = state => {
  return {
    scheduleTypes: state.scheduleTypes,
    scheduleDetails: state.scheduleDetails
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetails)
