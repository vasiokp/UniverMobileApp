import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { GET_RETAKES } from "./actionTypes"
import { Buffer } from 'buffer'

export const getRetakes = (refresh = false) => {
	return async dispatch => {
		dispatch({ type: refresh ? GET_RETAKES.REFRESHING : GET_RETAKES.PENDING })
		if (!refresh) {
			try {
				const cachedResult = await AsyncStorage.getItem('RETAKES')
				if (cachedResult !== null) {
					dispatch({
						type: GET_RETAKES.SUCCESS,
						payload: JSON.parse(cachedResult)
					})
				}
			} catch (err) {}
		}
		try {
			const result = await axios.get(`/api/retake/getall`)
			dispatch({
				type: GET_RETAKES.SUCCESS,
				payload: result.data
			})
			try {
                await AsyncStorage.setItem('RETAKES', JSON.stringify(result.data))
			} catch (err) {}
		} catch (err) {
			console.log(err) 
			dispatch({ type: GET_RETAKES.ERROR })
		}
	}
}
