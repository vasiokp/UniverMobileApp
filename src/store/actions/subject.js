import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { FETCH_SUBJECTS } from "./actionTypes"

export const fetchSubjects = (refresh) => {
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_SUBJECTS.REFRESHING : FETCH_SUBJECTS.PENDING })
		if (!refresh) {
			try {
				let cachedData = await AsyncStorage.getItem('subjects')
				if (cachedData) {
					dispatch({
						type: FETCH_SUBJECTS.SUCCESS,
						payload: JSON.parse(cachedData)
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get('/api/subject/getall')
			dispatch({
				type: FETCH_SUBJECTS.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem('subjects', JSON.stringify(result.data))
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_SUBJECTS.ERROR })
		}
	}
}
