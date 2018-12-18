import { CHECK_AUTH, LOGIN, LOGOUT, CHANGE_PASSWORD, CLEAR_PROFILE_ERROR } from "../actions/actionTypes"

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
	case CHANGE_PASSWORD.PENDING:
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
	case CHANGE_PASSWORD.SUCCESS:
		return {
			...state,
			loading: false,
			error: false
		}
	case CHANGE_PASSWORD.ERROR:
		return {
			...state,
			loading: false,
			error: true
		}
	case CLEAR_PROFILE_ERROR:
		return {
			...state,
			error: false
		}
	default:
		return {
			...state
		}
	}
}

export default reducer
