import { FETCH_ATTENDANCE } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ATTENDANCE.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_ATTENDANCE.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_ATTENDANCE.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        items: action.payload
      }
    case FETCH_ATTENDANCE.ERROR:
      return {
        ...state,
        loading: false,
        error: true
			}
		default:
      return state
  }
}

export default reducer
