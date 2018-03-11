import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import createGroupReducer from './createGroupReducer'

export default combineReducers({
  loginReducer,
  createGroupReducer
});
