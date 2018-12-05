import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { FETCH_SCHEDULE_DETAILS } from "./actionTypes"

export const fetchScheduleDetails = (id, refresh) => {
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_SCHEDULE_DETAILS.REFRESHING : FETCH_SCHEDULE_DETAILS.PENDING })
		if (!refresh) {
			try {
				const cachedData = await AsyncStorage.getItem(`scheduleDetails_${id}`)
				if (cachedData) {
					dispatch({
						type: FETCH_SCHEDULE_DETAILS.SUCCESS,
						payload: JSON.parse(cachedData)
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get(`/api/schedule/getbyid?id=${id}`)
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
