import { providers } from './firebase'

export const SIGNIN = 'SIGNIN'
export const SIGNOUT = 'SIGNOUT'

const initialState = {
  signedIn: false,
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

export const authenticate = (store) => (nextState, replace) => {
  const state = store.getState()
  if (state.auth.user == null) {
    replace('/login')
  }
  return
}

export const loginRedirect = (store) => (nextState, replace) => {
  const state = store.getState()
  console.log('login redirect', state.auth.user)
  if (state.auth.user != null) {
    replace('/')
  }
  return
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGNOUT:
      return initialState
    case SIGNIN:
      return {
        signedIn: true,
        user: action.payload
      }
    default:
      return state
  }
}

export default auth
