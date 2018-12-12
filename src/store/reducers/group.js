import { FETCH_GROUPS } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_GROUPS.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_GROUPS.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        items: action.payload
      }
    case FETCH_GROUPS.ERROR:
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
