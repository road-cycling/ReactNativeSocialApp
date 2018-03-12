import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import createGroupReducer from './createGroupReducer'
import welcomeReducer from './welcomeReducer'

export default combineReducers({
  loginReducer,
  createGroupReducer,
  welcomeReducer
});
