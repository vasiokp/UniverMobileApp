import { FETCH_TEACHERS } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEACHERS.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_TEACHERS.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_TEACHERS.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        items: action.payload
      }
    case FETCH_TEACHERS.ERROR:
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
