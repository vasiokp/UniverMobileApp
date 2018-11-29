import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import scheduleReducer from './reducers/schedule'

const rootReducer = combineReducers({
	schedule: scheduleReducer
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
