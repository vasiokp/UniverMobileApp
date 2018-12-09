import React, { Component } from 'react'
import { View, Text, SectionList, TextInput, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/index'
import { startLogin } from '../../../App'

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

  render() {
    const sections = [
      {
        title: 'Електронна пошта',
        data: [
          {
            key: 'email',
            template: () => (
              <TextInput editable={false}
                value="example@gmail.com"
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
                value="+38 (012) 3456789"
                underlineColorAndroid="#fff"
                fontWeight="300"
                fontSize={16}
              />
            )
          }
        ]
      }
    ]
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
                }}>ВМ</Text>
              </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Text style={{ fontSize: 22 }}>
                  Віталій Мосорюк
                </Text>
                <Text style={{ fontWeight: '300', marginTop: 5 }}>група 602</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ height: 70, justifyContent: 'flex-end', paddingHorizontal: '15%' }}>
            <Button title="Вийти" color='red' onPress={() => this.logout()} />
          </View>
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
    profile: state.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab)
