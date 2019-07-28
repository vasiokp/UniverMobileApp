import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { GET_STATEEXAMS } from "./actionTypes"
import { Buffer } from 'buffer'

export const getStateExams = (refresh = false) => {
	return async dispatch => {
		dispatch({ type: refresh ? GET_STATEEXAMS.REFRESHING : GET_STATEEXAMS.PENDING })
		if (!refresh) {
			try {
				const cachedResult = await AsyncStorage.getItem('STATEEXAMS')
				if (cachedResult !== null) {
					dispatch({
						type: GET_STATEEXAMS.SUCCESS,
						payload: JSON.parse(cachedResult)
					})
				}
			} catch (err) {}
		}
		try {
			const result = await axios.get(`/api/stateexam/getall`)
			dispatch({
				type: GET_STATEEXAMS.SUCCESS,
				payload: result.data
			})
			try {
                await AsyncStorage.setItem('STATEEXAMS', JSON.stringify(result.data))
			} catch (err) {}
		} catch (err) {
			console.log(err) 
			dispatch({ type: GET_STATEEXAMS.ERROR })
		}
	}
}
