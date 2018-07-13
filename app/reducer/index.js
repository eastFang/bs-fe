import doneReducer from './done'
import todoReducer from './todo'
import { combineReducers } from 'redux'

export default combineReducers({
	doneReducer,
	todoReducer,
})