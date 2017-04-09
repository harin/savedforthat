import { providers } from './firebase'
import { syncThatWithFirebase } from './thats'
export const SIGNIN = 'SIGNIN'
export const SIGNOUT = 'SIGNOUT'

const initialState = {
  user: null
}

export const signIn = () => (dispatch, getState) => {
  const state = getState()
  const app = state.app
  app.auth().signInWithRedirect(providers.google)
}

export const signOut = () => (dispatch, getState) => {
  const state = getState()
  const app = state.app

  app.auth().signOut()
  .then(() => {
    dispatch({ type: SIGNOUT })
  })
  .catch((error) => {
    console.error(error)
  })
}

export const authenticate = (store) => (nextState, replace, callback) => {
  console.log('auth!')
  const state = store.getState()
  const auth = state.app.auth()
  if (auth.currentUser) {
    console.log('user found')
    return callback()
  }
  console.log('waiting for user')
  auth.onAuthStateChanged((user) => {
    console.log('auth state change x', user)
    store.dispatch({ type: SIGNIN, payload: user })
    if (user) {
      if (state.routing.locationBeforeTransitions.pathname === '/login') {
        replace('/thats')
      }
      syncThatWithFirebase(store)
      callback()
    } else {
      replace('/login')
      callback()
    }
  })
}

export const loginRedirect = (store) => (nextState, replace, callback) => {
  const state = store.getState()
  console.log('login redirect', state.auth.user)
  if (state.auth.user != null) {
    if (state.routing.locationBeforeTransitions.pathname === '/login') {
      replace('/thats')
    }
  }

  const auth = state.app.auth()
  auth.onAuthStateChanged((user) => {
    console.log('auth state change', user)
    store.dispatch({ type: SIGNIN, payload: user })
    if (user) {
      console.log(state)
      if (state.routing.locationBeforeTransitions.pathname === '/login') {
        console.log('replacing thats', replace)
        replace('/thats')
        callback()
      }
      syncThatWithFirebase(store)
    } else {
      replace('/login')
      callback()
    }
  })
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGNOUT:
      return initialState
    case SIGNIN:
      return {
        user: action.payload
      }
    default:
      return state
  }
}

export default auth
