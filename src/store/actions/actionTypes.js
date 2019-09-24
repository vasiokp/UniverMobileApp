const buildType = type => {
  return {
    PENDING: `${type}_PENDING`,
    REFRESHING: `${type}_REFRESHING`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`
  }
}

export const FETCH_SCHEDULE = buildType('FETCH_SCHEDULE')
export const FETCH_ALL_SCHEDULE = buildType('FETCH_ALL_SCHEDULE')
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE'
export const UPDATE_ALL_SCHEDULE = 'UPDATE_ALL_SCHEDULE'
export const SET_SCHEDULE_FILTERS = 'SET_SCHEDULE_FILTERS'
export const FETCH_SCHEDULE_TYPES = buildType('FETCH_SCHEDULE_TYPES')
export const FETCH_SCHEDULE_DETAILS = buildType('FETCH_SCHEDULE_DETAILS')
export const UPDATE_SCHEDULE_DETAILS = 'UPDATE_SCHEDULE_DETAILS'
export const CLEAR_SCHEDULE_DETAILS = 'CLEAR_SCHEDULE_DETAILS'
export const GET_NEWS = buildType('GET_NEWS')
export const GET_NEWS_IMAGE = buildType('GET_NEWS_IMAGE')
export const SET_NEWS_FILTERS = 'SET_NEWS_FILTERS'
export const POST_NOTE = buildType('POST_NOTE')
export const POST_MESSAGE = buildType('POST_MESSAGE')
export const UPDATE_MESSAGE_SUCCESS = 'UPDATE_MESSAGE_SUCCESS'
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS'
export const CHECK_AUTH = { SUCCESS: 'CHECK_AUTH_SUCCESS', ERROR: 'CHECK_AUTH_ERROR' }
export const LOGIN = buildType('LOGIN')
export const LOGOUT = buildType('LOGOUT')
export const CHANGE_PASSWORD = buildType('CHANGE_PASSWORD')
export const CLEAR_PROFILE_ERROR = buildType('CLEAR_PROFILE_ERROR')
export const FETCH_GROUPS = buildType('FETCH_GROUPS')
export const FETCH_SPECIALTIES = buildType('FETCH_SPECIALTIES')
export const FETCH_TEACHERS = buildType('FETCH_TEACHERS')
export const FETCH_SUBJECTS = buildType('FETCH_SUBJECTS')
export const FETCH_AUDITORIES = buildType('FETCH_AUDITORIES')
export const FETCH_ATTENDANCE = buildType('FETCH_ATTENDANCE')
export const SAVE_ATTENDANCE = buildType('SAVE_ATTENDANCE')
export const FETCH_NEWSTYPES = buildType('FETCH_NEWSTYPES')
export const GET_CREDITS = buildType('GET_CREDITS')
export const GET_EXAMS = buildType('GET_EXAMS')
export const GET_RETAKES = buildType('GET_RETAKES')
export const GET_STATEEXAMS = buildType('GET_STATEEXAMS')
export const GET_INFOMESSAGES = buildType('GET_INFOMESSAGES')
