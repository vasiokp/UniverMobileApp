import { GET_SCHEDULER } from "../actions/actionTypes";

const initialState = [
]

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
      Description: 'Komputer'
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
  },
  {
    LessonNumber: 3,
    Teacher: {
      Id: 2,
      Name: 'Eugnie',
      LastName: 'Tribala'
    },
    Auditory: {
      Id: 4,
      Number: 15,
      Description: 'room'
    }
  },
  {
    LessonNumber: 4,
    Teacher: {
      Id: 2,
      Name: 'Galina',
      LastName: 'Malinkova'
    },
    Auditory: {
      Id: 3,
      Number: 23,
      Description: 'Komputer'
    }
  },
  {
    LessonNumber: 5,
    Teacher: {
      Id: 2,
      Name: 'Galina',
      LastName: 'Malinkova'
    },
    Auditory: {
      Id: 3,
      Number: 23,
      Description: 'Komputer'
    }
  },
  {
    LessonNumber: 6,
    Teacher: {
      Id: 2,
      Name: 'Petr',
      LastName: 'Juikovici'
    },
    Auditory: {
      Id: 3,
      Number: 23,
      Description: 'Komputer'
    }
  },
  {
    LessonNumber: 7,
    Teacher: {
      Id: 2,
      Name: 'Maxim',
      LastName: 'ololo'
    },
    Auditory: {
      Id: 5,
      Number: 11,
      Description: 'room'
    }
  },

]
const les2 = [
  {
    LessonNumber: 1,
    Teacher: {
      Id: 5,
      Name: 'Troph',
      LastName: 'Murel'
    },
    Auditory: {
      Id: 3,
      Number: 22,
      Description: 'Komputer'
    }
  }
]
const les3 = [
  {
    LessonNumber: 1,
    Teacher: {
      Id: 5,
      Name: 'Uilraih',
      LastName: 'Murel'
    },
    Auditory: {
      Id: 3,
      Number: 22,
      Description: 'Komputer'
    }
  },
  {
    LessonNumber: 2,
    Teacher: {
      Id: 5,
      Name: 'Troph',
      LastName: 'Murel'
    },
    Auditory: {
      Id: 3,
      Number: 22,
      Description: 'Komputer'
    }
  }
]
const reducer = (state = initialState, action) => {
  console.log('reducer',action.payload)
  switch (action.type) {
    case GET_SCHEDULER:
      return [
        ...state,
        {
          Date: '2018-08-08',
          Lessons: les
        },
        {
          Date: '2018-08-09',
          Lessons: les2
        },
        {
          Date: '2018-08-10',
          Lessons: les3
        }
      ]
    default:
      return state;
  }
};

export default reducer;