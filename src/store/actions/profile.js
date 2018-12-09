import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { CHECK_AUTH, LOGIN, LOGOUT } from "./actionTypes"
import md5 from 'js-md5'

export const checkAuth = () => {
	return async dispatch => {
		try {
			const result = await AsyncStorage.getItem('access_token')
			console.log(result)
			if (result) {
				dispatch({
					type: CHECK_AUTH.SUCCESS,
					payload: result
				})
			} else {
				dispatch({ type: CHECK_AUTH.ERROR })
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: CHECK_AUTH.ERROR })
		}
	}
}

export const login = (login, password) => {
	return async dispatch => {
		dispatch({ type: LOGIN.PENDING })
		try {
			// const result = await axios.post('login')
			const hashedPassword = md5(password)
			await AsyncStorage.setItem('access_token', 'some-token')
			dispatch({
				type: LOGIN.SUCCESS,
				payload: 'some-token'
			})
		} catch (err) {
			console.log(err)
			dispatch({ type: LOGIN.ERROR })
		}
	}
}

export const logout = () => {
	return async dispatch => {
		dispatch({ type: LOGOUT.PENDING })
		try {
			// const result = await axios.post('logout')
			await AsyncStorage.removeItem('access_token')
			dispatch({ type: LOGOUT.SUCCESS })
		} catch (err) {
			console.log(err)
			dispatch({ type: LOGOUT.ERROR })
		}
	}
}
