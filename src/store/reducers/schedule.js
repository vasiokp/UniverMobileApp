import { GET_SCHEDULE } from "../actions/actionTypes"
// import schedule from '../fakeData/schedule'

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return action.payload
    default:
      return state
  }
};

export default reducer