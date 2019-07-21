import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { GET_EXAMS } from "./actionTypes"
import { Buffer } from 'buffer'

export const getExams = (refresh = false) => {
	return async dispatch => {
		dispatch({ type: refresh ? GET_EXAMS.REFRESHING : GET_EXAMS.PENDING })
		if (!refresh) {
			try {
				const cachedResult = await AsyncStorage.getItem('EXAMS')
				if (cachedResult !== null) {
					dispatch({
						type: GET_EXAMS.SUCCESS,
						payload: JSON.parse(cachedResult)
					})
				}
			} catch (err) {}
		}
		try {
			const result = await axios.get(`/api/exam/getall`)
			dispatch({
				type: GET_EXAMS.SUCCESS,
				payload: result.data
			})
			try {
                await AsyncStorage.setItem('EXAMS', JSON.stringify(result.data))
			} catch (err) {}
		} catch (err) {
			console.log(err) 
			dispatch({ type: GET_EXAMS.ERROR })
		}
	}
}
