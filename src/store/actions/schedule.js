import { AsyncStorage } from "react-native"
import axios from '../../plugins/axios'
import { groupBy } from '../../utils'
import moment from 'moment'
import { FETCH_SCHEDULE, FETCH_ALL_SCHEDULE, UPDATE_SCHEDULE, UPDATE_ALL_SCHEDULE, SET_SCHEDULE_FILTERS } from "./actionTypes"
import { getScheduleMoment } from './helpers'

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
		if (schedule[strDate]) {
			schedule[strDate].forEach((s, i) => {
				schedule[strDate][i].moment = getScheduleMoment(schedule[strDate][i], schedule[strDate], moment())
			})
			schedule[strDate].sort((a, b) => a.LessonNumber - b.LessonNumber)
		}
	}
	return schedule
}

export const updateSchedule = () => {
	return (dispatch, getState) => {
		let items = getState().schedule.items
		Object.keys(items).forEach(key => {
			if (items[key]) {
				items[key].forEach((item, index) => {
					items[key][index] = {
						...items[key][index],
						moment: getScheduleMoment(item, items[key], moment())
					}
				})
			}
		})
		dispatch({
			type: UPDATE_SCHEDULE,
			payload: items
		})
		let all = getState().schedule.all
		Object.keys(all).forEach(key => {
			if (all[key]) {
				all[key].forEach((item, index) => {
					all[key][index] = {
						...all[key][index],
						moment: getScheduleMoment(item, all[key], moment())
					}
				})
			}
		})
		dispatch({
			type: UPDATE_ALL_SCHEDULE,
			payload: all
		})
	}
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
					if (item) {
						cachedData[strDate] = JSON.parse(item)
					}
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
			const result = await axios.get(`/api/schedule/getall?start=${start}&end=${end}`)
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

export const fetchAllSchedule = (start, end, refresh) => {
	return async dispatch => {
		dispatch({ type: refresh ? FETCH_ALL_SCHEDULE.REFRESHING : FETCH_ALL_SCHEDULE.PENDING })
		if (!refresh) {
			try {
				let cachedData = {}
				for (let date = moment(start, dateFormat); date.isSameOrBefore(moment(end, dateFormat), 'date'); date.add(1, 'd')) {
					const strDate = date.format(dateFormat)
					const item = await AsyncStorage.getItem(`all_schedule_${strDate}`)
					if (item) {
						cachedData[strDate] = JSON.parse(item)
					}
				}
				dispatch({
					type: FETCH_ALL_SCHEDULE.SUCCESS,
					payload: cachedData
				})
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const body = { Start: start, End: end }
			const result = await axios.post('/api/schedule/getall', body)
			const schedule = projectSchedule(start, end, result.data)
			dispatch({
				type: FETCH_ALL_SCHEDULE.SUCCESS,
				payload: schedule
			})
			try {
				Object.keys(schedule).forEach(async key => {
					await AsyncStorage.setItem(`all_schedule_${key}`, JSON.stringify(schedule[key]))
				})
			} catch (err) {
				console.log(err)
			}
		} catch (err) {
			console.log(err)
			dispatch({ type: FETCH_ALL_SCHEDULE.ERROR })
		}
	}
}

export const setScheduleFilters = filters => {
	return dispatch => {
		dispatch({
			type: SET_SCHEDULE_FILTERS,
			payload: filters
		})
	}
}
