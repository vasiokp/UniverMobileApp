import { GET_SCHEDULER } from "../actions/actionTypes";
import schedule from '../fakeData/schedule';

const initialState = [
]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULER:
      return schedule;
    default:
      return state;
  }
};

export default reducer;