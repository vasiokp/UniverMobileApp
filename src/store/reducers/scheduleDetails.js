import { FETCH_SCHEDULE_DETAILS, UPDATE_SCHEDULE_DETAILS, CLEAR_SCHEDULE_DETAILS, POST_NOTE } from "../actions/actionTypes"

const applicationUserId = 1

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  item: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
    case FETCH_SCHEDULE_DETAILS.PENDING:
    case POST_NOTE.PENDING:
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
    case POST_NOTE.ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case POST_NOTE.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        item: {
          ...state.item,
          Note: action.payload
        }
      }
    case UPDATE_SCHEDULE_DETAILS:
      return {
        ...state,
        item: action.payload
      }
    case CLEAR_SCHEDULE_DETAILS:
      return {
        ...state,
        item: {}
      }
    default:
      return state
  }
}

export default reducer
