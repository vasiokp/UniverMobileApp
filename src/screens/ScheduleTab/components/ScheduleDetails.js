import React, { Component } from 'react'
import { 
  View,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import { fetchScheduleDetails, updateScheduleDetails, addNote, updateNote } from  '../../../store/actions/index'
import moment from 'moment'
import classTypes from '../../../plugins/classTypes'
import { capitalize } from '../../../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import * as userRoles from '../../../plugins/userRoles'

const refreshInterval = 30000 // 30 seconds

const pendingIcon = require('../../../assets/pending.png')
const completedIcon = require('../../../assets/completed.png')
const currentIcon = require('../../../assets/current.png')

const saveButton = {
  title: 'Зберегти',
  id: 'save',
  disabled: true
}

const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md'

const addIcon = (
	<Icon name={`${iconPrefix}-add-circle-outline`} size={22} color="rgb(0, 122, 255)" />
)

const removeIcon = (
	<Icon name={`${iconPrefix}-remove-circle-outline`} size={22} color="red" />
)

class ScheduleDetails extends Component {
  constructor(props) {
    super(props)
    if (props.passedItem.isMyLesson) {
      this.props.navigator.setButtons({
        rightButtons: [saveButton]
      })
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.state = {
      noteText: '',
      messages: []
    }
  }

  messageInputs = []

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'save') {
        this.noteInput.blur()
        this.messageInputs.forEach(input => {
          if (input && input.blur) input.blur()
        })
        this.enableSaveButton(false)
        console.log(this.state.messages)
        this.state.messages.forEach(message => {
          const msg = this.props.scheduleDetails.item.Messages.find(m => m.Id === message.Id)
          if (msg && msg.Text !== message.Text) {
            // update
            this.props.updateNote({
              ...msg,
              ScheduleId: this.props.passedItem.Id,
              Text: message.Text
            })
          } else if (!msg && message.Text !== '') {
            // add
            this.props.addNote({
              ScheduleId: this.props.passedItem.Id,
              Text: message.Text
            })
          }
        })
        if (this.props.scheduleDetails.item.Note && this.props.scheduleDetails.item.Note.Text !== this.state.noteText) {
          this.props.updateNote({
            ...this.props.scheduleDetails.item.Note,
            ScheduleId: this.props.passedItem.Id,
            Text: this.state.noteText
          })
        } else if (!this.props.scheduleDetails.item.Note && this.state.noteText !== '') {
          this.props.addNote({
            ScheduleId: this.props.passedItem.Id,
            Text: this.state.noteText
          })
        }
      }
    }
  }

  componentDidMount() {
    this.props.fetchScheduleDetails(this.props.passedItem.Id).then(() => {
      this.setState({
        noteText: this.props.scheduleDetails.item.Note ? this.props.scheduleDetails.item.Note.Text : '',
        messages: this.props.scheduleDetails.item.Messages
      })
    })
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

  onMessageTextChange(message, index, text) {
    message.Text = text
    const messages = this.state.messages
    messages[index] = message
    this.setState({
      messages: messages
    })
    this.enableSaveButton(true)
  }

  enableSaveButton(enabled) {
    this.props.navigator.setButtons({
      rightButtons: [{
        ...saveButton,
        disabled: !enabled
      }]
    })
  }

  removeMessage(message) {
    Alert.alert(
      'Ви дійсно хочете видалити повідомлення?',
      '',
      [
        { text: 'Ні', onPress: () => {}, style: 'cancel'},
        { text: 'Так', onPress: () => {
          this.setState({
            massages: this.state.messages.splice(this.state.messages.indexOf(message), 1)
          })
        }}
      ]
    )
  }

  isAddButtonEnabled() {
    return this.state.messages.length === 0 || this.state.messages.findIndex(m => !m.Id) >= 0
  }

  render() {
    const ScheduleType = this.props.scheduleTypes.items.find(st => st.Name === this.props.passedItem.ScheduleTypeName)
    const details = {
      ...this.props.passedItem,
      ScheduleType,
      moment: this.props.scheduleDetails.item.moment,
      BuildingAddress: this.props.scheduleDetails.item.Auditory && this.props.scheduleDetails.item.Auditory.Building ? this.props.scheduleDetails.item.Auditory.Building.Description : '',
      Messages: this.props.scheduleDetails.item.Messages || []
    }
    const icon = details.moment === -1 ? completedIcon : details.moment === 0 ? currentIcon : details.moment === 1 ? pendingIcon : null
    let sections = [
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
                    {details.TeacherName}
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
      }
    ]
    if (this.props.profile.userRole === userRoles.STUDENT) {
      if (this.props.passedItem.isMyLesson && details.Messages.length > 0) {
        sections.push({
          title: 'Повідомлення',
          data: [
            {
              key: 'messages',
              template: () => details.Messages.map(message => (
                <View key={message.Id} style={{ marginVertical: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: '300' }}>{message.Text}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 3 }}>
                    <Text style={{ fontSize: 13, fontWeight: '300', fontStyle: 'italic', color: '#666' }}>Невідомий автор</Text>
                  </View>
                </View>
              ))
            }
          ]
        })
      }
    } else if (this.props.profile.userRole === userRoles.TEACHER) {
      sections.push({
        title: 'Повідомлення',
        button: () => (
          <TouchableOpacity disabled={!this.isAddButtonEnabled()} onPress={() => {
            this.setState({ messages: this.state.messages.concat([{}]) })
            this.enableSaveButton(true)
          }}>
            {addIcon}
          </TouchableOpacity>
        ),
        data: this.state.messages.length > 0 ? [
          {
            key: 'messages',
            template: () => this.state.messages.map((message, index) => (
              <View key={index}
                style={[
                  { flexDirection: 'row' },
                  index < this.state.messages.length - 1 ?
                  { borderBottomWidth: 0.5, borderColor: '#ddd', marginBottom: 2 }
                  : null
                ]}>
                <TextInput
                  placeholder="Ваш текст..."
                  autoFocus
                  ref={input => this.messageInputs[index] = input}
                  value={message.Text}
                  height={120}
                  underlineColorAndroid="#fff"
                  style={{ color:'#333', flex: 1 }}
                  fontWeight="300"
                  fontSize={16}
                  multiline={true}
                  onChangeText={text => this.onMessageTextChange(message, index, text)}
                  onFocus={() => {
                    this.messageInputs[index].measure((fx, fy, w, h, px, py) => {
                      if (Platform.OS === 'ios' && py > 0) {
                        this.scroller.scrollTo({ y: py - 200, animated: true })
                      }
                    })
                  }}
                />
                <View style={{ marginRight: -5, marginTop: 4, paddingLeft: 10 }}>
                  <TouchableOpacity onPress={() => this.removeMessage(message)}>
                    {removeIcon}
                  </TouchableOpacity>
                </View>
              </View>
            ))
          }
        ] : []
      })
    }
    if (this.props.passedItem.isMyLesson) {
      sections.push({
        title: 'Нотатки',
        data: [
          {
            key: 'note',
            template: () => (
              <TextInput placeholder="Ваш текст..."
                ref={noteInput => this.noteInput = noteInput}
                value={this.state.noteText}
                height={120}
                underlineColorAndroid="#fff"
                style={{ color:'#333' }}
                fontWeight="300"
                fontSize={16}
                multiline={true}
                onChangeText={text => this.onNoteTextChange(text)}
                onFocus={() => {
                  if (Platform.OS === 'ios') {
                    this.scroller.scrollToEnd({ animated: true })
                  }
                }}
              />
            )
          }
        ]
      })
    }
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
          renderItem={({ item, index, section }) => section.data.length > 0 ?(
            <View style={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              paddingVertical: 5
            }}>
              {item.template()}
            </View>
          ) : null}
          renderSectionHeader={({ section }) => (
            <View style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              paddingBottom: 3,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{ color: '#7a92a5', fontWeight: '300' }}>
                {section.title}
              </Text>
              {section.button ?
                <View style={{
                  marginRight: -5
                }}>
                  {section.button()}
                </View>
              : null}
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
    scheduleDetails: state.scheduleDetails,
    profile: state.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetails)
