import { FETCH_NEWSTYPES } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWSTYPES.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_NEWSTYPES.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_NEWSTYPES.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        items: action.payload
      }
    case FETCH_NEWSTYPES.ERROR:
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
