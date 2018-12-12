import { FETCH_AUDITORIES } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUDITORIES.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_AUDITORIES.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_AUDITORIES.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        items: action.payload
      }
    case FETCH_AUDITORIES.ERROR:
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
