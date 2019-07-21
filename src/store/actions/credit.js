import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { GET_CREDITS } from "./actionTypes"
import { Buffer } from 'buffer'

export const getCredits = (refresh = false) => {
	return async dispatch => {
		dispatch({ type: refresh ? GET_CREDITS.REFRESHING : GET_CREDITS.PENDING })
		if (!refresh) {
			try {
				const cachedResult = await AsyncStorage.getItem('CREDITS')
				if (cachedResult !== null) {
					dispatch({
						type: GET_CREDITS.SUCCESS,
						payload: JSON.parse(cachedResult)
					})
				}
			} catch (err) {}
		}
		try {
			const result = await axios.get(`/api/credit/getall`)
			dispatch({
				type: GET_CREDITS.SUCCESS,
				payload: result.data
			})
			try {
                await AsyncStorage.setItem('CREDITS', JSON.stringify(result.data))
			} catch (err) {}
		} catch (err) {
			console.log(err) 
			dispatch({ type: GET_CREDITS.ERROR })
		}
	}
}
