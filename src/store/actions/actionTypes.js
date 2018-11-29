const buildType = type => {
  return {
    PENDING: `${type}_PENDING`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`
  }
}

export const GET_SCHEDULE = buildType('GET_SCHEDULE')
export const GET_EXTRA_SCHEDULE = buildType('GET_EXTRA_SCHEDULE')
