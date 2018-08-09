import { GET_SCHEDULER } from "../actions/actionTypes";

const initialState = [
]

const les = [
  {
    Id:1,
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
    Id:2,
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
    Id:3,
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
    Id:4,
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
    Id:5,
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
    Id:6,
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
    Id:7,
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
    Id:8,
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
    Id:9,
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
    Id:10,
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