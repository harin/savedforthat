import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux'


import Login from './components/Login'
import Logout from './components/Logout'

class App extends Component {
  render() {
    console.log(this.props.signedIn)
    if (this.props.signedIn) {
      return (
        <div className="App">
          <Logout />
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      )
    }

    return <Login />
  }
}


const mapStateToProps = state => ({
  signedIn: state.auth.signedIn
})




export default connect(mapStateToProps)(App);
