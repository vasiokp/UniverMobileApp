import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { FETCH_SCHEDULE_TYPES } from "./actionTypes"

export const fetchScheduleTypes = (refresh) => {
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_SCHEDULE_TYPES.REFRESHING : FETCH_SCHEDULE_TYPES.PENDING })
		if (!refresh) {
			try {
				const cachedData = await AsyncStorage.getItem('scheduleTypes')
				if (cachedData) {
					dispatch({
						type: FETCH_SCHEDULE_TYPES.SUCCESS,
						payload: cachedData
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get('/api/scheduletype/getall')
			dispatch({
				type: FETCH_SCHEDULE_TYPES.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem('scheduleTypes', JSON.stringify(result.data))
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_SCHEDULE_TYPES.ERROR })
		}
	}
}
