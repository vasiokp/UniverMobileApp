import { FETCH_SUBJECTS } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBJECTS.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_SUBJECTS.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_SUBJECTS.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        items: action.payload
      }
    case FETCH_SUBJECTS.ERROR:
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
