import { GET_CREDITS } from "../actions/actionTypes"

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
    case GET_CREDITS.PENDING:
      return {
        ...state,
        loading: true
      }
    case GET_CREDITS.REFRESHING:
      return {
        ...state,
        refreshing: true,
      }
    case GET_CREDITS.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        loaded: true,
        error: false,
        items: action.payload
      }
    case GET_CREDITS.ERROR:
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
