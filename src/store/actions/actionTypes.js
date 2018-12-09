const buildType = type => {
  return {
    PENDING: `${type}_PENDING`,
    REFRESHING: `${type}_REFRESHING`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`
  }
}

export const FETCH_SCHEDULE = buildType('FETCH_SCHEDULE')
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE'
export const FETCH_SCHEDULE_TYPES = buildType('FETCH_SCHEDULE_TYPES')
export const FETCH_SCHEDULE_DETAILS = buildType('FETCH_SCHEDULE_DETAILS')
export const UPDATE_SCHEDULE_DETAILS = 'UPDATE_SCHEDULE_DETAILS'
export const GET_NEWS = buildType('GET_NEWS')
export const POST_NOTE = buildType('POST_NOTE')
export const CHECK_AUTH = { SUCCESS: 'CHECK_AUTH_SUCCESS', ERROR: 'CHECK_AUTH_ERROR' }
export const LOGIN = buildType('LOGIN')
export const LOGOUT = buildType('LOGOUT')
