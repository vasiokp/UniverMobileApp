import { GET_RETAKES } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  loaded: false,
  error: false,
  items: []
}

const reducer = (state = initialState, action) => {
  let index
  switch (action.type) {
    case GET_RETAKES.PENDING:
      return {
        ...state,
        loading: true
      }
    case GET_RETAKES.REFRESHING:
      return {
        ...state,
        refreshing: true,
      }
    case GET_RETAKES.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        loaded: true,
        error: false,
        items: action.payload
      }
    case GET_RETAKES.ERROR:
      return {
        ...state,
        loading: false,
        refreshing: false,
        loaded: false,
        error: true
      }
    default:
      return state
  }
}

export default reducer
