import axios from 'axios'
import { store, startLogin } from '../../App'
import { relogin } from '../store/actions'

const instance = axios.create({
  //baseURL: 'https://universityapi.azurewebsites.net'
  baseURL: 'http://mykolag-001-site10.etempurl.com'
})

instance.interceptors.request.use(config => {
	const token = store.getState().profile.accessToken
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`
	}
	return config
})

instance.interceptors.response.use(
	null,
	error => {
		if (error.response && error.response.status) {
			switch (error.response.status) {
				case 401: // unauthorized
					startLogin()
			// 		const 
			// 		store.dispatch(relogin())
			// 		.then(token => {
			// 			error.config.headers['Authorization'] = `Bearer ${token}`
			// 			return instance.request(error.config)
			// 		})
			// 		.catch(err => {
			// 			startLogin()
			// 		})
			// }
					return
			}
		}
})

export default instance
