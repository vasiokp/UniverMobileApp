import { FETCH_SCHEDULE_DETAILS, UPDATE_SCHEDULE_DETAILS } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  item: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
    case FETCH_SCHEDULE_DETAILS.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_SCHEDULE_DETAILS.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_SCHEDULE_DETAILS.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        item: action.payload
      }
    case FETCH_SCHEDULE_DETAILS.ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case UPDATE_SCHEDULE_DETAILS:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state
  }
}

export default reducer
