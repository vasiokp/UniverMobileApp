import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { CHECK_AUTH, LOGIN, LOGOUT } from "./actionTypes"
import * as userRoles from '../../plugins/userRoles'
import md5 from 'js-md5'
import moment from 'moment'

export const checkAuth = () => {
	return async dispatch => {
		try {
			const stored = await AsyncStorage.multiGet([
				'access_token',
				'expires',
				'user_info'
			])
			const accessToken = stored[0][1]
			const expires = stored[1][1]
			const userInfo = stored[2][1]
			if (accessToken && expires && userInfo) {
				if (moment(expires).isBefore(moment())) {
					const parsedUserInfo = JSON.parse(userInfo)
					const userRole = parsedUserInfo.GroupId ? userRoles.STUDENT : userRoles.TEACHER
					dispatch({
						type: CHECK_AUTH.SUCCESS,
						payload: {
							accessToken: accessToken,
							userInfo: parsedUserInfo,
							userRole: userRole
						}
					})
				} else {
					try {
						const token = await relogin()(dispatch)
					} catch (err) {
						console.log(err)
						dispatch({ type: CHECK_AUTH.ERROR })
					}
				}
			} else {
				dispatch({ type: CHECK_AUTH.ERROR })
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: CHECK_AUTH.ERROR })
		}
	}
}

export const relogin = () => {
	return async dispatch => {
		try {
			const stored = await AsyncStorage.multiGet(['login', 'passwordHash'])
			const login = stored[0][1]
			const passwordHash = stored[1][1]
			if (login && passwordHash) {
				const body = { Email: login, Password: passwordHash }
				const result = await axios.post('/account/login', body)
				if (result.status === 200) {
					await AsyncStorage.setItem('access_token', result.data.Access_token)
					const userInfo = await axios.post('/account/getuserinfo', null, {
						headers: {
							'Authorization': `Bearer ${result.data.Access_token}`
						}
					})
					if (userInfo.status === 200) {
						await AsyncStorage.setItem('user_info', JSON.stringify(userInfo.data))
						const userRole = userInfo.data.GroupId ? userRoles.STUDENT : userRoles.TEACHER
						dispatch({
							type: LOGIN.SUCCESS,
							payload: {
								accessToken: result.data.Access_token,
								userInfo: userInfo.data,
								userRole: userRole
							}
						})
						Promise.resolve(result.data.Access_token)
					} else {
						Promise.reject(new Error('couldn`t relogin'))
					}
				} else {
						Promise.reject(new Error('couldn`t relogin'))
				}
			} else {
				Promise.reject(new Error('couldn`t relogin'))
			}
		} catch (err) {
			Promise.reject(new Error('couldn`t relogin'))
		}
	}
}

export const login = (login, password) => {
	return async dispatch => {
		dispatch({ type: LOGIN.PENDING })
		try {
			const passwordHash = md5(password)
			const body = { Email: login, Password: passwordHash }
			const result = await axios.post('/account/login', body)
			if (result.status === 200) {
				await AsyncStorage.multiSet([
					['access_token', result.data.Access_token],
					['expires', result.data.Expires],
					['login', login],
					['passwordHash', passwordHash]
				])
				const userInfo = await axios.post('/account/getuserinfo', null, {
					headers: {
						'Authorization': `Bearer ${result.data.Access_token}`
					}
				})
				if (userInfo.status === 200) {
					await AsyncStorage.setItem('user_info', JSON.stringify(userInfo.data))
					const userRole = userInfo.data.GroupId ? userRoles.STUDENT : userRoles.TEACHER
					dispatch({
						type: LOGIN.SUCCESS,
						payload: {
							accessToken: result.data.Access_token,
							userInfo: userInfo.data,
							userRole: userRole
						}
					})
				} else {
					dispatch({ type: LOGIN.ERROR })
				}
			} else {
				dispatch({ type: LOGIN.ERROR })
			}
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
			await AsyncStorage.multiRemove([
				'access_token',
				'expires',
				'login',
				'passwordHash',
				'user_info'
			])
			dispatch({ type: LOGOUT.SUCCESS })
		} catch (err) {
			console.log(err)
			dispatch({ type: LOGOUT.ERROR })
		}
	}
}
