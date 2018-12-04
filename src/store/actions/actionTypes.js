const buildType = type => {
  return {
    PENDING: `${type}_PENDING`,
    REFRESHING: `${type}_REFRESHING`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`
  }
}

export const FETCH_SCHEDULE = buildType('FETCH_SCHEDULE')
export const FETCH_SCHEDULE_TYPES = buildType('FETCH_SCHEDULE_TYPES')
export const FETCH_SCHEDULE_DETAILS = buildType('FETCH_SCHEDULE_DETAILS')
export const GET_NEWS = buildType('GET_NEWS')
