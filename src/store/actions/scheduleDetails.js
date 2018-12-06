import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { FETCH_SCHEDULE_DETAILS, UPDATE_SCHEDULE_DETAILS } from "./actionTypes"
import moment from 'moment'
import { getScheduleMoment } from './helpers'

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
			const lessons = getState().schedule.items[result.data]
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
