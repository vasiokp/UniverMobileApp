import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { FETCH_GROUPS } from "./actionTypes"

export const fetchGroups = (refresh) => {
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_GROUPS.REFRESHING : FETCH_GROUPS.PENDING })
		if (!refresh) {
			try {
				let cachedData = await AsyncStorage.getItem('groups')
				if (cachedData) {
					dispatch({
						type: FETCH_GROUPS.SUCCESS,
						payload: JSON.parse(cachedData)
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get('/api/group/getall')
			dispatch({
				type: FETCH_GROUPS.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem('groups', JSON.stringify(result.data))
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_GROUPS.ERROR })
		}
	}
}
