import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { FETCH_NEWSTYPES } from "./actionTypes"

export const fetchNewsTypes = (refresh) => {
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_NEWSTYPES.REFRESHING : FETCH_NEWSTYPES.PENDING })
		if (!refresh) {
			try {
				let cachedData = await AsyncStorage.getItem('newsTypes')
				if (cachedData) {
					dispatch({
						type: FETCH_NEWSTYPES.SUCCESS,
						payload: JSON.parse(cachedData)
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get('/api/newstype/getall')
			dispatch({
				type: FETCH_NEWSTYPES.SUCCESS,
				payload: result.data
			})
			try {
				await AsyncStorage.setItem('newsTypes', JSON.stringify(result.data))
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_NEWSTYPES.ERROR })
		}
	}
}
