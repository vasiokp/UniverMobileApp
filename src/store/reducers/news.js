import { GET_NEWS } from "../actions/actionTypes"

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS.PENDING:
      return {
        ...state,
        loading: true
      }
    case GET_NEWS.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        items: action.payload
      }
    case GET_NEWS.ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      }
    default:
      return state
  }
}

export default reducer
