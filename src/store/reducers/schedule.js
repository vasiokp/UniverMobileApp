import { GET_SCHEDULE } from "../actions/actionTypes"
import { GET_EXTRA_SCHEDULE } from "../actions/actionTypes"

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  extraLoading: false,
  extraError: false,
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE.PENDING:
      return {
        ...state,
        loading: true
      }
    case GET_SCHEDULE.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        items: action.payload
      }
    case GET_SCHEDULE.ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      }
    case GET_EXTRA_SCHEDULE.PENDING:
      return {
        ...state,
        extraLoading: true
      }
    case GET_EXTRA_SCHEDULE.SUCCESS:
      return {
        ...state,
        extraLoading: false,
        extraError: false,
        items: state.items.concat(action.payload)
      }
    case GET_EXTRA_SCHEDULE.ERROR:
      return {
        ...state,
        extraLoading: false,
        extraError: true
      }
    default:
      return state
  }
}

export default reducer
