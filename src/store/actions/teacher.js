import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { FETCH_TEACHERS } from "./actionTypes"

export const fetchTeachers = (refresh) => {
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_TEACHERS.REFRESHING : FETCH_TEACHERS.PENDING })
		if (!refresh) {
			try {
				let cachedData = await AsyncStorage.getItem('teachers')
				if (cachedData) {
					dispatch({
						type: FETCH_TEACHERS.SUCCESS,
						payload: JSON.parse(cachedData)
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get('/api/teacher/getall')
			dispatch({
				type: FETCH_TEACHERS.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem('teachers', JSON.stringify(result.data))
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_TEACHERS.ERROR })
		}
	}
}
