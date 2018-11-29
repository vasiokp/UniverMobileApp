import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import moment from 'moment'
import { GET_SCHEDULE, GET_EXTRA_SCHEDULE } from "./actionTypes"

export const getSchedule = (start, end = null, refresh = false) => {
	return async dispatch => {
		dispatch({ type: GET_SCHEDULE.PENDING })
		if (!refresh) {
			try {
				const cachedResult = await AsyncStorage.getItem('SCHEDULE')
				if (cachedResult !== null) {
					dispatch({
						type: GET_SCHEDULE.SUCCESS,
						payload: JSON.parse(cachedResult)
					})
				}
			} catch (err) { }
		}
		try {
			const result = await axios.get(`/api/schedule/getall?start=${start}${end ? '&end=' + end : ''}`)
			dispatch({
				type: GET_SCHEDULE.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem('SCHEDULE', JSON.stringify(result.data))
			} catch (err) {}
		} catch (err) {
			dispatch({ type: GET_SCHEDULE.ERROR })
		}
	}
}

export const getExtraSchedule = () => {
	return async (dispatch, getState) => {
		dispatch({ type: GET_EXTRA_SCHEDULE.PENDING })
		const dates = getState().schedule.items.map(i => moment(i.Date))
		const maxDate = moment.max(dates)
		maxDate.add(3, 'd')
		const start = maxDate.format('YYYY-MM-DD')
		maxDate.add(4, 'd')
		const end = maxDate.format('YYYY-MM-DD')
		try {
			const result = await axios.get(`/api/schedule/getall?start=${start}&end=${end}`)
			dispatch({
				type: GET_EXTRA_SCHEDULE.SUCCESS,
				payload: result.data
			})
		} catch (err) {
			console.log(err)
			dispatch({ type: GET_EXTRA_SCHEDULE.ERROR })
		}
	}
}
