import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'

import Login from './components/Login'
import Logout from './components/Logout'
import Header from './components/Header'

class App extends Component {
  render() {
    if (this.props.signedIn) {
      return (
        <div className="App">
          <Header />
          {this.props.children}
          <Logout />
        </div>
      )
    }

    return <Login />
  }
}

const mapDispatchToProps = {
}

const mapStateToProps = state => ({
  signedIn: state.auth.user != null
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

