import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { GET_NEWS, GET_NEWS_IMAGE, SET_NEWS_FILTERS } from "./actionTypes"
import { Buffer } from 'buffer'

export const getNews = (refresh = false) => {
	return async dispatch => {
		dispatch({ type: refresh ? GET_NEWS.REFRESHING : GET_NEWS.PENDING })
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

export const getImage = (newsId, refresh) => {
	return async dispatch => {
		dispatch({ type: GET_NEWS_IMAGE.PENDING, payload: newsId })
		if (!refresh) {
			try {
				const cachedResult = await AsyncStorage.getItem(`NEWS_IMAGE_${newsId}`)
				if (cachedResult !== null) {
					dispatch({
						type: GET_NEWS_IMAGE.SUCCESS,
						payload: JSON.parse(cachedResult)
					})
				}
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get(`/api/news/getimage?newsId=${newsId}`, { responseType: 'arraybuffer' })
			const img = Buffer.from(result.data, 'binary').toString('base64')
			if (result.status === 200) {
				dispatch({
					type: GET_NEWS_IMAGE.SUCCESS,
					payload: {
						id: newsId,
						image: img
					}
				})
			} else {
				console.log(result) 
				dispatch({ type: GET_NEWS_IMAGE.ERROR, payload: newsId })
			}
			try {
				await AsyncStorage.setItem(`NEWS_IMAGE_${newsId}`, JSON.stringify(img))
			} catch (err) {
				console.log(err) 
			}
		} catch (err) {
			console.log(err) 
			dispatch({ type: GET_NEWS_IMAGE.ERROR, payload: newsId })
		}
	}
}

export const setNewsFilters = filters => {
	return dispatch => {
		dispatch({
			type: SET_NEWS_FILTERS,
			payload: filters
		})
	}
}
