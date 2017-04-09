import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { SIGNIN } from './reducers/auth'
import App from './App';
import './index.css';

import ThatList from './components/ThatList'
import NewThat from './components/NewThat'
import That from './components/That'
import Login from './components/Login'
import { loadThats } from './reducers/thats'
import { authenticate, loginRedirect } from './reducers/auth'

// Create a history of your choosing (we're using a browser history in this case)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(routerMiddleware(browserHistory), thunk),
    persistState('thats')
  )
)
const history = syncHistoryWithStore(browserHistory, store)

const app = store.getState().app
const user = app.auth().currentUser
if (user) {
  store.dispatch({ type: SIGNIN, payload: user })
}

app.auth().getRedirectResult().then(function(result) {
  if (result.user) {
    result.user.credential = result.credential
    store.dispatch({ type: SIGNIN, payload: result.user })
  }
}).catch(function(error) {
  console.error(error)
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route
        path="/login"
        component={Login}
        onEnter={loginRedirect(store)}
      />
      <Route path="/" component={App} onEnter={authenticate(store)}>
        <Route
          path="thats"
          onEnter={() => {
            // TODO: do this properly!
            loadThats()(store.dispatch, store.getState)
          }}
        >
          <IndexRoute component={ThatList} />
          <Route path="new" component={NewThat} />
          <Route path=":key" component={That} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
