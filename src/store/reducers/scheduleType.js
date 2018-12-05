import { FETCH_SCHEDULE_TYPES } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  items: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
    case FETCH_SCHEDULE_TYPES.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_SCHEDULE_TYPES.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_SCHEDULE_TYPES.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        items: action.payload
      }
    case FETCH_SCHEDULE_TYPES.ERROR:
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
