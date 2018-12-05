import { FETCH_SCHEDULE } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  items: {}
}

const merge = (oldItems, newItems) => {
  let mergedItems = Object.assign({}, oldItems)
  Object.keys(newItems).forEach(key => {
    mergedItems[key] = newItems[key]
  })
  return mergedItems
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHEDULE.PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_SCHEDULE.REFRESHING:
      return {
        ...state,
        refreshing: true
      }
    case FETCH_SCHEDULE.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: false,
        items: merge(state.items, action.payload)
      }
    case FETCH_SCHEDULE.ERROR:
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
