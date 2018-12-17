import { CHECK_AUTH, LOGIN, LOGOUT } from "../actions/actionTypes"

const initialState = {
  loading: false,
	error: false,
	loggedIn: false,
	accessToken: null,
	userInfo: {},
	userRole: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
	case CHECK_AUTH.SUCCESS:
		return {
			...state,
			loggedIn: true,
			accessToken: action.payload.accessToken,
			userInfo: action.payload.userInfo,
			userRole: action.payload.userRole
		}
	case CHECK_AUTH.ERROR:
		return {
			...state,
			loggedIn: false,
			accessToken: null,
			userInfo: {},
			userRole: null
		}
	case LOGIN.PENDING:
		return {
			...state,
			loading: true
		}
	case LOGIN.SUCCESS:
		return {
			...state,
			loading: false,
			error: false,
			loggedIn: true,
			accessToken: action.payload.accessToken,
			userInfo: action.payload.userInfo,
			userRole: action.payload.userRole
		}
	case LOGIN.ERROR:
		return {
			...state,
			loading: false,
			error: true,
			loggedIn: false
		}
	case LOGOUT.PENDING:
		return {
			...state,
			loading: true
		}
	case LOGOUT.SUCCESS:
		return {
			...state,
			loading: false,
			error: false,
			loggedIn: false,
			accessToken: null,
			userInfo: {},
			userRole: null
		}
	case LOGOUT.ERROR:
		return {
			...state,
			loading: false,
			error: true,
			loggedIn: true
		}
	default:
		return {
			...state
		}
	}
}

export default reducer
