import { FETCH_SCHEDULE, FETCH_ALL_SCHEDULE, UPDATE_SCHEDULE, UPDATE_ALL_SCHEDULE, SET_SCHEDULE_FILTERS } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  error: false,
  items: {},
  all: {},
  filters: {
    showOnlyMySchedule: true,
    groupId: null,
    teacherId: null,
    subjectId: null,
    auditoryId: null
  }
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
    case FETCH_ALL_SCHEDULE.PENDING:
      return {
        ...state
      }
    case FETCH_ALL_SCHEDULE.REFRESHING:
      return {
        ...state
      }
    case FETCH_ALL_SCHEDULE.SUCCESS:
      return {
        ...state,
        all: merge(state.all, action.payload)
      }
    case FETCH_ALL_SCHEDULE.ERROR:
      return {
        ...state
      }
    case UPDATE_SCHEDULE:
      return {
        ...state,
        items: action.payload
      }
    case UPDATE_ALL_SCHEDULE:
      return {
        ...state,
        all: action.payload
      }
    case SET_SCHEDULE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      }
    default:
      return state
  }
}

export default reducer
