import { GET_EXAMS } from "../actions/actionTypes"

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
    case GET_EXAMS.PENDING:
      return {
        ...state,
        loading: true
      }
    case GET_EXAMS.REFRESHING:
      return {
        ...state,
        refreshing: true,
      }
    case GET_EXAMS.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        loaded: true,
        error: false,
        items: action.payload
      }
    case GET_EXAMS.ERROR:
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
