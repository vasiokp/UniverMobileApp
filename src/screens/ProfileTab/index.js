import React, { Component } from 'react'
import { View, Text, SectionList, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/index'
import { startLogin } from '../../../App'
import * as userRoles from '../../plugins/userRoles'

class ProfileTab extends Component {
  constructor(props) {
    super(props)
  }

  logout() {
    Alert.alert(
      'Ви дійсно хочете вийти?',
      '',
      [
        { text: 'Ні', onPress: () => {}, style: 'cancel'},
        { text: 'Так', onPress: () => {
          this.props.logout().then(() => {
            if (this.props.profile.loggedIn === false) {
              startLogin()
            }
          })
        }},
      ]
    )
  }

  changePassword() {
    this.props.navigator.showModal({
      screen: 'ChangePassword'
    })
  }

  getPictureLetters(str) {
    if (!str) return ''
    const pattern = /[A-ZА-Я]+/g
    const alpha = str.match(pattern)
    if (!alpha || alpha.length <= 0) return ''
    if (alpha.length === 1) return alpha[0]
    return [alpha[0], alpha[1]].join('')
  }

  render() {
    const sections = [
      {
        title: 'Електронна пошта',
        data: [
          {
            key: 'email',
            template: () => (
              <TextInput editable={false}
                value={this.props.profile.userInfo.Email}
                placeholder="Не вказано"
                underlineColorAndroid="#fff"
                fontWeight="300"
                fontSize={16}
              />
            )
          }
        ]
      },
      {
        title: 'Телефон',
        data: [
          {
            key: 'phone',
            template: () => (
              <TextInput editable={false}
                value={this.props.profile.userInfo.Phone}
                placeholder="Не вказано"
                underlineColorAndroid="#fff"
                fontWeight="300"
                fontSize={16}
              />
            )
          }
        ]
      },
      {
        data: [
          {
            key: 'phone',
            template: () => (
              <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => this.changePassword()}>
                <Text style={{ width: '100%', fontSize: 16, textAlign: 'center', color: 'rgb(0, 122, 255)' }}>Змінити пароль</Text>
              </TouchableOpacity>
            )
          }
        ]
      },
      {
        data: [
          {
            key: 'phone',
            template: () => (
              <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => this.logout()}>
                <Text style={{ width: '100%', fontSize: 16, textAlign: 'center', color: 'red' }}>Вийти</Text>
              </TouchableOpacity>
            )
          }
        ]
      }
    ]
    const group = this.props.groups.items.find(g => g.Id === this.props.profile.userInfo.GroupId)
    return (
      <SectionList stickySectionHeadersEnabled={false}
        style={{ backgroundColor: '#f4f4f4', flex: 1 }}
        sections={sections}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#ddd'
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
        ListHeaderComponent={() => (
          <View style={{ marginVertical: 30 }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{
                backgroundColor: '#ccc',
                width: 130,
                height: 130,
                borderRadius: 65,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{
                  fontSize: 56,
                  fontWeight: '300',
                  color: '#333'
                }}>{this.getPictureLetters(this.props.profile.userInfo.Name)}</Text>
                  </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Text style={{ paddingHorizontal: 40, fontSize: 22, textAlign: 'center' }}>
                  {this.props.profile.userInfo.Name}
                </Text>
                {this.props.profile.userRole === userRoles.STUDENT ?
                  <Text style={{ fontWeight: '300', marginTop: 5 }}>
                    {group ? `група ${group.Name}`: null}
                  </Text> :
                null}
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ height: 100, paddingTop: 25, paddingHorizontal: '15%' }} />
        )}>>
        </SectionList>
      )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    groups: state.groups
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab)
