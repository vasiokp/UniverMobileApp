import { FETCH_SPECIALTIES } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPECIALTIES.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_SPECIALTIES.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_SPECIALTIES.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        items: action.payload
      }
    case FETCH_SPECIALTIES.ERROR:
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
