import axios from '../../plugins/axios';
import { GET_SCHEDULE } from "./actionTypes";

export const getSchedule = date => {
	return async dispatch => {
		try {
			const result = await axios.get(`/api/schedule/getall?start=${date}`);
			console.log('schedule/getall', result.data);
			dispatch({
				type: GET_SCHEDULE,
				payload: result.data
			});
		} catch (err) {
			console.log(err);
		}
	}
}
