import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import reducer from './reducers'

import { SIGNIN } from './reducers/auth'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      // Build the middleware for intercepting and dispatching navigation actions
      routerMiddleware(history),
      thunk
    )
  )
)



const app = store.getState().app
app.auth().onAuthStateChanged(function(user) {
  if (user) {
    // TODO: this will override credential if called after getRedirectResult()
    store.dispatch({ type: SIGNIN, payload: user})
  }
});

app.auth().getRedirectResult().then(function(result) {
  if (result.user) {
    result.user.credential = result.credential
    store.dispatch({ type: SIGNIN, payload: result.user})
  }
}).catch(function(error) {
  console.error(error)
});


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
