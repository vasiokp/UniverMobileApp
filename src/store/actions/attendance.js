import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { FETCH_ATTENDANCE } from "./actionTypes"

export const fetchAttendance = (id, refresh) => {
    console.log(id,refresh)
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_ATTENDANCE.REFRESHING : FETCH_ATTENDANCE.PENDING })
		if (!refresh) {
			try {
				let cachedData = await AsyncStorage.getItem('attendance')
				if (cachedData) {
					dispatch({
						type: FETCH_ATTENDANCE.SUCCESS,
						payload: JSON.parse(cachedData)
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get('/api/Attendance/Get?scheduleId=' + id)
			dispatch({
				type: FETCH_ATTENDANCE.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem('auditories', JSON.stringify(result.data))
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_ATTENDANCE.ERROR })
		}
	}
}
