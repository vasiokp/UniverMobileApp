import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { groupBy } from '../../utils'
import moment from 'moment'
import { FETCH_SCHEDULE } from "./actionTypes"

const groupId = 1

const dateFormat = 'YYYY-MM-DD'

const projectSchedule = (start, end, items) => {
	const groups = groupBy(items.map(i => {
		return {
			...i,
			Date: i.Date.substr(0, 10)
		}
	}), 'Date')
	let schedule = {}
	for (let date = moment(start, dateFormat); date.isSameOrBefore(moment(end, dateFormat), 'date'); date.add(1, 'd')) {
		const strDate = date.format(dateFormat)
		schedule[strDate] = groups[strDate] || []
	}
	return schedule
}

export const fetchSchedule = (start, end, refresh) => {
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_SCHEDULE.REFRESHING : FETCH_SCHEDULE.PENDING })
		if (!refresh) {
			try {
				let cachedData = {}
				for (let date = moment(start, dateFormat); date.isSameOrBefore(moment(end, dateFormat), 'date'); date.add(1, 'd')) {
					const strDate = date.format(dateFormat)
					const item = await AsyncStorage.getItem(`schedule_${strDate}`)
					cachedData[strDate] = item ? JSON.parse(item) : []
				}
				dispatch({
					type: FETCH_SCHEDULE.SUCCESS,
					payload: cachedData
				})
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const result = await axios.get(`/api/schedule/getall?groupId=${groupId}&start=${start}&end=${end}`)
			const schedule = projectSchedule(start, end, result.data)
			dispatch({
				type: FETCH_SCHEDULE.SUCCESS,
				payload: schedule
			})
			try {
				Object.keys(schedule).forEach(async key => {
					await AsyncStorage.setItem(`schedule_${key}`, JSON.stringify(schedule[key]))
				})
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_SCHEDULE.ERROR })
		}
	}
}
