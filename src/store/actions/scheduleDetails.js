import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import {
	FETCH_SCHEDULE_DETAILS,
	UPDATE_SCHEDULE_DETAILS,
	CLEAR_SCHEDULE_DETAILS,
	POST_NOTE,
	POST_MESSAGE,
	DELETE_MESSAGE_SUCCESS,
	UPDATE_MESSAGE_SUCCESS
} from "./actionTypes"
import moment from 'moment'
import { getScheduleMoment } from './helpers'

export const clearScheduleDetails = () => {
	return async dispatch => {
		dispatch({ type: CLEAR_SCHEDULE_DETAILS })
	}
}

export const updateScheduleDetails = () => {
	return (dispatch, getState) => {
		let item = getState().scheduleDetails.item
		const lessons = getState().schedule.items[item.Date.substr(0, 10)]
		item.moment = getScheduleMoment(item, lessons, moment())
		dispatch({
			type: UPDATE_SCHEDULE_DETAILS,
			payload: item
		})
	}
}

export const fetchScheduleDetails = (id, refresh) => {
	return async (dispatch, getState) => {
		dispatch({ type: refresh ? FETCH_SCHEDULE_DETAILS.REFRESHING : FETCH_SCHEDULE_DETAILS.PENDING })
		if (!refresh) {
			try {
				const cachedData = await AsyncStorage.getItem(`scheduleDetails_${id}`)
				if (cachedData) {
					const parsedData = JSON.parse(cachedData)
					const lessons = getState().schedule.items[parsedData.Date]
					parsedData.moment = getScheduleMoment(parsedData, lessons, moment())
					dispatch({
						type: FETCH_SCHEDULE_DETAILS.SUCCESS,
						payload: parsedData
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get(`/api/schedule/getbyid?id=${id}`)
			result.data.Date = result.data.Date.substr(0, 10)
			const lessons = getState().schedule.items[result.data.Date]
			result.data.moment = getScheduleMoment(result.data, lessons, moment())
			dispatch({
				type: FETCH_SCHEDULE_DETAILS.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem(`scheduleDetails_${id}`, JSON.stringify(result.data))
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_SCHEDULE_DETAILS.ERROR })
		}
	}
}

export const addNote = (note) => {
	return async (dispatch, getState) => {
		dispatch({ type: POST_NOTE.PENDING })
		try {
			const applicationUserId = getState().profile.userInfo.ApplicationUserId
			const result = await axios.post('/api/note/add', {
				...note,
				ApplicationUserId: applicationUserId,
				IsMessage: false
			})
			if (result.status === 200) {
				dispatch({
					type: POST_NOTE.SUCCESS,
					payload: result.data
				})
			} else {
				console.log(result)
				dispatch({ type: POST_NOTE.ERROR })
			}
		} catch(err) {
			console.log(err)
			dispatch({ type: POST_NOTE.ERROR })
		}
	}
}

export const updateNote = (note) => {
	return async (dispatch, getState) => {
		dispatch({ type: POST_NOTE.PENDING })
		try {
			const applicationUserId = getState().profile.userInfo.ApplicationUserId
			const result = await axios.post('/api/note/update', {
				...note,
				ApplicationUserId: applicationUserId,
				IsMessage: false
			})
			if (result.status === 200) {
				dispatch({
					type: POST_NOTE.SUCCESS,
					payload: result.data
				})
			} else {
				console.log(result)
				dispatch({ type: POST_NOTE.ERROR })
			}
		} catch(err) {
			console.log(err)
			dispatch({ type: POST_NOTE.ERROR })
		}
	}
}

export const addMessage = (message) => {
	return async (dispatch, getState) => {
		dispatch({ type: POST_MESSAGE.PENDING })
		try {
			const applicationUserId = getState().profile.userInfo.ApplicationUserId
			const result = await axios.post('/api/note/add', {
				...message,
				ApplicationUserId: applicationUserId,
				IsMessage: true
			})
			if (result.status === 200) {
				dispatch({
					type: POST_MESSAGE.SUCCESS,
					payload: result.data
				})
			} else {
				console.log(result)
				dispatch({ type: POST_MESSAGE.ERROR })
			}
		} catch(err) {
			console.log(err)
			dispatch({ type: POST_MESSAGE.ERROR })
		}
	}
}

export const updateMessage = (message) => {
	return async (dispatch, getState) => {
		dispatch({ type: POST_MESSAGE.PENDING })
		try {
			const applicationUserId = getState().profile.userInfo.ApplicationUserId
			const result = await axios.post('/api/note/update', {
				...message,
				ApplicationUserId: applicationUserId,
				IsMessage: true
			})
			if (result.status === 200) {
				dispatch({
					type: UPDATE_MESSAGE_SUCCESS,
					payload: result.data
				})
			} else {
				console.log(result)
				dispatch({ type: POST_MESSAGE.ERROR })
			}
		} catch(err) {
			console.log(err)
			dispatch({ type: POST_MESSAGE.ERROR })
		}
	}
}

export const removeMessage = (id) => {
	return async (dispatch, getState) => {
		dispatch({ type: POST_MESSAGE.PENDING })
		try {
			const applicationUserId = getState().profile.userInfo.ApplicationUserId
			const result = await axios.post('/api/note/delete', {
				Id: id,
				ApplicationUserId: applicationUserId,
				IsMessage: true
			})
			if (result.status === 200) {
				dispatch({
					type: DELETE_MESSAGE_SUCCESS,
					payload: id
				})
			} else {
				console.log(result)
				dispatch({ type: POST_MESSAGE.ERROR })
			}
		} catch(err) {
			console.log(err)
			dispatch({ type: POST_MESSAGE.ERROR })
		}
	}
}
