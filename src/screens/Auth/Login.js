import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	Text,
	ActivityIndicator,
	Keyboard,
	Animated
} from 'react-native'
import logoImage from '../../assets/logo.png'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import { login } from '../../store/actions'
import { connect } from 'react-redux'
import { startTabs } from '../../../App'

const KEYBOARD_HEIGHT = 200

class Login extends Component {
	constructor(props) {
		super(props)
		this.keyboardHeight = new Animated.Value(0)
		this.state = {
			login: '',
			password: ''
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

	loginDisabled () {
		return this.state.login === '' || this.state.password === ''
	}

  login() {
		this.props.login(this.state.login, this.state.password).then(() => {
			if (this.props.profile.loggedIn === true) {
				startTabs()
			}
		})
  }

  render() {
    return (
      <PageLayout>
        <View style={styles.page}>
					<View style={styles.wrapper}>
						<Image source={logoImage} style={styles.logoImageStyle} resizeMode='contain' />
						<View style={styles.form}>
							<TextInput placeholder="Логін"
								underlineColorAndroid='#333'
								value={this.state.login}
								onChangeText={text => this.setState({ login: text })}
								onSubmitEditing={() => this.passwordInput.focus()}
								enablesReturnKeyAutomatically={true}
								style={styles.input} />
							<TextInput placeholder="Пароль"
								ref={passwordInput => this.passwordInput = passwordInput}
								textContentType="password"
								value={this.state.password}
								onChangeText={text => this.setState({ password: text })}
								onSubmitEditing={() => this.passwordInput.blur()}
								enablesReturnKeyAutomatically={true}
								secureTextEntry={true}
								underlineColorAndroid='#333'
								style={styles.input} />
							{this.props.profile.error ? <Text style={styles.errorText}>Невірний логін або пароль</Text> : null}
							<TouchableOpacity onPress={() => this.login()}
								style={[styles.button, this.loginDisabled() ? styles.disabledButton : {}]}
								disabled={this.loginDisabled() || this.props.profile.loading}
								activeOpacity={0.6}>
								{this.props.profile.loading ?
									<ActivityIndicator size='small' color='#fff' /> :
									<Text style={styles.buttonText}>Увійти</Text>
								}
							</TouchableOpacity>
						</View>
						<Animated.View style={{ height: this.keyboardHeight }} />
					</View>
        </View>
      </PageLayout>
    )
  }
}

const styles = StyleSheet.create({
  logoImageStyle: {
		width: '45%'
  },
  page: {
		flex: 1,
		justifyContent: 'center'
	},
	wrapper: {
		alignItems: 'center',
		paddingHorizontal: 25
	},
	form: {
		width: '100%',
		marginTop: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		padding: 20
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
    login: (_login, _password) => dispatch(login(_login, _password))
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
