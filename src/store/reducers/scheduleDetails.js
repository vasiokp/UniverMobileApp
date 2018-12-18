import {
  FETCH_SCHEDULE_DETAILS,
  UPDATE_SCHEDULE_DETAILS,
  CLEAR_SCHEDULE_DETAILS,
  POST_NOTE,
  POST_MESSAGE,
  UPDATE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_SUCCESS
} from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  item: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
    case FETCH_SCHEDULE_DETAILS.PENDING:
    case POST_NOTE.PENDING:
    case POST_MESSAGE.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_SCHEDULE_DETAILS.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_SCHEDULE_DETAILS.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        item: action.payload
      }
    case FETCH_SCHEDULE_DETAILS.ERROR:
    case POST_NOTE.ERROR:
    case POST_MESSAGE.ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case POST_NOTE.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        item: {
          ...state.item,
          Note: action.payload
        }
      }
    case POST_MESSAGE.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        item: {
          ...state.item,
          Messages: (state.item.Messages || []).concat([action.payload])
        }
      }
    case UPDATE_SCHEDULE_DETAILS:
      return {
        ...state,
        item: action.payload
      }
    case UPDATE_MESSAGE_SUCCESS:
      const index = (state.item.Messages || []).findIndex(m => m.Id === action.payload.Id)
      if (index >= 0) {
        state.item.Messages.splice(index, 1, action.payload)
      } else {
        state.item.Messages.push(action.payload)
      }
      return {
        ...state,
        loading: false,
        error: false,
        item: {
          ...state.item,
          Messages: state.item.Messages
        } 
      }
    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        item: {
          ...state.item,
          Messages: (state.item.Messages || []).filter(m => m.Id !== action.payload)
        }
      }
    case CLEAR_SCHEDULE_DETAILS:
      return {
        ...state,
        item: {}
      }
    default:
      return state
  }
}

export default reducer
