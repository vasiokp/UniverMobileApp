import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { FETCH_AUDITORIES } from "./actionTypes"

export const fetchAuditories = (refresh) => {
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_AUDITORIES.REFRESHING : FETCH_AUDITORIES.PENDING })
		if (!refresh) {
			try {
				let cachedData = await AsyncStorage.getItem('auditories')
				if (cachedData) {
					dispatch({
						type: FETCH_AUDITORIES.SUCCESS,
						payload: JSON.parse(cachedData)
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get('/api/auditory/getall')
			dispatch({
				type: FETCH_AUDITORIES.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem('auditories', JSON.stringify(result.data))
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_AUDITORIES.ERROR })
		}
	}
}
