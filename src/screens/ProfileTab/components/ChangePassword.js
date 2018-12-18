import React, { Component } from 'react'
import {
	View,
	Text,
	Platform,
	TextInput,
	TouchableOpacity,
	Keyboard,
	Animated,
	StyleSheet,
	ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { changePassword, clearErrors } from '../../../store/actions'

const KEYBOARD_HEIGHT = 200

class ChangePassword extends Component {
	static navigatorButtons = {
    rightButtons: [{
      title: 'Закрити',
      id: 'close'
    }]
	}
	
  constructor(props) {
		super(props)
		this.keyboardHeight = new Animated.Value(0)
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
		this.state = {
			oldPassword: '',
			newPassword: '',
			newPasswordConfirm: '',
			passwordsEqual: true
		}
	}

	onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      switch (event.id) {
				case 'close':
					this.props.clearErrors()
					this.props.navigator.dismissModal()
					return
        default:
          return
      }
    }
	}
	
	componentWillMount () {
		if (Platform.OS === 'ios') {
    	this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
			this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))
		}
	}
	
	componentWillUnmount () {
		if (Platform.OS === 'ios') {
   		this.keyboardWillShowListener.remove()
			this.keyboardWillHideListener.remove()
		}
  }

  _keyboardWillShow (event) {
		if (Platform.OS === 'ios') {
			Animated.timing(this.keyboardHeight, {
				duration: event.duration,
				toValue: KEYBOARD_HEIGHT,
			}).start()
		}
  }

  _keyboardWillHide (event) {
		if (Platform.OS === 'ios') {
			Animated.timing(this.keyboardHeight, {
				duration: event.duration,
				toValue: 0,
			}).start()
		}
	}
	
	submitDisabled () {
		return this.state.oldPassword === '' || this.state.newPassword === '' || this.state.newPasswordConfirm === ''
	}

	submit() {
		if (this.state.newPassword !== this.state.newPasswordConfirm) {
			this.setState({ passwordsEqual: false })
			return
		} else {
			this.setState({ passwordsEqual: true })
			this.props.changePassword({
				newPassword: this.state.newPassword,
				oldPassword: this.state.oldPassword
			}).then(() => {
				if (this.props.profile.error === false) {
					this.props.navigator.dismissModal()
				}
			})
		}
  }

	render() {
		return (
			<View style={styles.page}>
				<View style={styles.wrapper}>
					<Text style={styles.title}>Зміна паролю</Text>
					<View style={styles.form}>
						<TextInput placeholder="Старий пароль"
							textContentType="password"
							underlineColorAndroid='transparent'
							autoCorrect={false} 
							value={this.state.oldPassword}
							onChangeText={text => this.setState({ oldPassword: text })}
							onSubmitEditing={() => this.newPasswordInput.focus()}
							enablesReturnKeyAutomatically={true}
							secureTextEntry={true}
							style={styles.input}
						/>
						<TextInput placeholder="Новий пароль"
							ref={newPasswordInput => this.newPasswordInput = newPasswordInput}
							textContentType="password"
							value={this.state.newPassword}
							onChangeText={text => this.setState({ newPassword: text })}
							onSubmitEditing={() => this.newPasswordConfirmInput.focus()}
							enablesReturnKeyAutomatically={true}
							secureTextEntry={true}
							underlineColorAndroid='transparent'
							style={styles.input}
						/>
						<TextInput placeholder="Підтвердження паролю"
							ref={newPasswordConfirmInput => this.newPasswordConfirmInput = newPasswordConfirmInput}
							textContentType="password"
							value={this.state.newPasswordConfirm}
							onChangeText={text => this.setState({ newPasswordConfirm: text })}
							onSubmitEditing={() => this.newPasswordConfirmInput.blur()}
							enablesReturnKeyAutomatically={true}
							secureTextEntry={true}
							underlineColorAndroid='transparent'
							style={styles.input}
						/>
						{this.props.profile.error ? <Text style={styles.errorText}>Невірний пароль</Text> : null}
						{!this.props.profile.error && !this.state.passwordsEqual ? <Text style={styles.errorText}>Паролі не співпадають</Text> : null}
						<TouchableOpacity onPress={() => this.submit()}
							style={[styles.button, this.submitDisabled() ? styles.disabledButton : {}]}
							disabled={this.submitDisabled() || this.props.profile.loading}
							activeOpacity={0.6}>
							{this.props.profile.loading ?
								<ActivityIndicator size='small' color='#fff' /> :
								<Text style={styles.buttonText}>Надіслати</Text>
							}
						</TouchableOpacity>
					</View>
					<Animated.View style={{ height: this.keyboardHeight }} />
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  page: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#f4f4f4'
	},
	wrapper: {
		alignItems: 'center',
		paddingHorizontal: 25
	},
	form: {
		width: '100%',
		padding: 20,
		borderRadius: 2
	},
	title: {
		fontSize: 20,
		fontWeight: '300',
		color: '#555'
	},
  input: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#aaa',
		color: '#333',
		marginVertical: 8,
    height: 45,
		fontSize: 16,
		padding: 10
	},
	errorText: {
		textAlign: 'center',
		color: '#e02800'
	},
	button: {
		height: 45,
		justifyContent: 'center',
		borderRadius: 2,
		backgroundColor: '#F89554',
		marginVertical: 8
	},
	disabledButton: {
		opacity: 0.6
	},
	buttonText: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 18
	}
})

const mapDispatchToProps = dispatch => {
  return {
		changePassword: (payload) => dispatch(changePassword(payload)),
		clearErrors: () => dispatch(clearErrors())
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
