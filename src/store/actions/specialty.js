import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { FETCH_SPECIALTIES } from "./actionTypes"

export const fetchSpecialties = (refresh) => {
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_SPECIALTIES.REFRESHING : FETCH_SPECIALTIES.PENDING })
		if (!refresh) {
			try {
				let cachedData = await AsyncStorage.getItem('specialties')
				if (cachedData) {
					dispatch({
						type: FETCH_SPECIALTIES.SUCCESS,
						payload: JSON.parse(cachedData)
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get('/api/specialty/getall')
			dispatch({
				type: FETCH_SPECIALTIES.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem('specialties', JSON.stringify(result.data))
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_SPECIALTIES.ERROR })
		}
	}
}
