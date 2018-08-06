import { GET_SCHEDULER } from "../actions/actionTypes";

const initialState = {
  Lessons: []
}

const les = [
  {
    LessonNumber: 1,
    Teacher: {
      Id: 2,
      Name: 'Galina',
      LastName: 'Malinkova'
    },
    Auditory: {
      Id: 3,
      Number: 23,
      Description: 'Komputer clasroom'
    }
  },
  {
    LessonNumber: 2,
    Teacher: {
      Id: 1,
      Name: 'Andriy',
      LastName: 'Kopovalov'
    },
    Auditory: {
      Id: 2,
      Number: 18,
      Description: 'No name'
    }
  }
]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULER:
      return {
        ...state,
        Lessons: les
      }
    default:
      return state;
  }
};

export default reducer;