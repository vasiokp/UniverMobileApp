import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import scheduleReducer from './reducers/schedule'
import scheduleTypeReducer from './reducers/scheduleType'
import scheduleDetailsReducer from './reducers/scheduleDetails'
import newsReducer from './reducers/news'
import profileReducer from './reducers/profile'
import groupReducer from './reducers/group'
import specialtyReducer from './reducers/specialty'
import teacherReducer from './reducers/teacher'
import subjectReducer from './reducers/subject'
import auditoryReducer from './reducers/auditory'

const rootReducer = combineReducers({
	schedule: scheduleReducer,
	scheduleTypes: scheduleTypeReducer,
	scheduleDetails: scheduleDetailsReducer,
	news: newsReducer,
	profile: profileReducer,
	groups: groupReducer,
	specialties: specialtyReducer,
	teachers: teacherReducer,
	subjects: subjectReducer,
	auditories: auditoryReducer
})

let composeEnhancers = compose

if (__DEV__) {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const configureStore = () => {
	return createStore(
		rootReducer,
		composeEnhancers(),
		applyMiddleware(thunkMiddleware)
	)
}

export default configureStore
