import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import moment from 'moment'
import { GET_NEWS } from "./actionTypes"

export const getNews = (refresh = false) => {
	return async dispatch => {
		dispatch({ type: GET_NEWS.PENDING })
		if (!refresh) {
			try {
				const cachedResult = await AsyncStorage.getItem('NEWS')
				if (cachedResult !== null) {
					dispatch({
						type: GET_NEWS.SUCCESS,
						payload: JSON.parse(cachedResult)
					})
				}
			} catch (err) {}
		}
		try {
			const result = await axios.get(`/api/news/getall`)
			dispatch({
				type: GET_NEWS.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem('NEWS', JSON.stringify(result.data))
			} catch (err) {}
		} catch (err) {
			console.log(err) 
			dispatch({ type: GET_NEWS.ERROR })
		}
	}
}
