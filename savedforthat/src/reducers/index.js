import { combineReducers } from 'redux'
import auth from './auth'
import router from './router'
import app from './firebase'

export default combineReducers({
  auth,
  router,
  app
})
