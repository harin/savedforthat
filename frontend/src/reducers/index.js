import { combineReducers } from 'redux'
import auth from './auth'
import routing from './router'
import app from './firebase'
import thats from './thats'

export default combineReducers({
  auth,
  routing,
  app,
  thats
})
