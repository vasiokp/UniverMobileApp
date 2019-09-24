import { GET_NEWS, GET_NEWS_IMAGE, SET_NEWS_FILTERS } from "../actions/actionTypes"

const initialState = {
  loading: false,
  refreshing: false,
  loaded: false,
  error: false,
  items: [],
  filters: {
    newsTypeId: null
  }
}

const reducer = (state = initialState, action) => {
  let index
  switch (action.type) {
    case GET_NEWS.PENDING:
      return {
        ...state,
        loading: true
      }
    case GET_NEWS.REFRESHING:
      return {
        ...state,
        refreshing: true,
      }
    case GET_NEWS.SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        loaded: true,
        error: false,
        items: action.payload
      }
    case GET_NEWS.ERROR:
      return {
        ...state,
        loading: false,
        refreshing: false,
        loaded: false,
        error: true
      }
    case GET_NEWS_IMAGE.PENDING:
      index = state.items.findIndex(i => i.Id === action.payload)
      if (index >= 0) {
        state.items.splice(index, 1, {
          ...state.items[index],
          imageLoading: true
        })
      }
      return {
        ...state,
        items: state.items
      }
    case GET_NEWS_IMAGE.SUCCESS:
      index = state.items.findIndex(i => i.Id === action.payload.id)
      if (index >= 0) {
        state.items.splice(index, 1, {
          ...state.items[index],
          imageLoading: false,
          imageError: false,
          image: action.payload.image
        })
      }
      return {
        ...state,
        items: state.items
      }
    case GET_NEWS_IMAGE.ERROR:
      index = state.items.findIndex(i => i.Id === action.payload)
      if (index >= 0) {
        state.items.splice(index, 1, {
          ...state.items[index],
          imageLoading: false,
          imageError: true
        })
      }
      return {
        ...state,
        items: state.items
      }
    case SET_NEWS_FILTERS:
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
