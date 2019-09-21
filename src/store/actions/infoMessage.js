import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { GET_INFOMESSAGES } from "./actionTypes"
import { Buffer } from 'buffer'

export const getInfoMessages = (refresh = false) => {
	return async dispatch => {
		dispatch({ type: refresh ? GET_INFOMESSAGES.REFRESHING : GET_INFOMESSAGES.PENDING })
		if (!refresh) {
			try {
				const cachedResult = await AsyncStorage.getItem('INFOMESSAGES')
				if (cachedResult !== null) {
					dispatch({
						type: GET_INFOMESSAGES.SUCCESS,
						payload: JSON.parse(cachedResult)
					})
				}
			} catch (err) {}
		}
		try {
			const result = await axios.get(`/api/infomessage/getall`)
			dispatch({
				type: GET_INFOMESSAGES.SUCCESS,
				payload: result.data
			})
			try {
                await AsyncStorage.setItem('INFOMESSAGES', JSON.stringify(result.data))
			} catch (err) {}
		} catch (err) {
			console.log(err) 
			dispatch({ type: GET_INFOMESSAGES.ERROR })
		}
	}
}
