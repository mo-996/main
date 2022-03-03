import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import socket from './socketReducer'
import phones from './phoneReducer'

export default combineReducers({
  auth,
  alert,
  socket,
  phones
})