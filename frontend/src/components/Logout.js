import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../reducers/auth'

const Logout = ({ signOut }) => {
  return (
    <button onClick={signOut}>logout</button>
  )
}

const mapDispatchToProps = {
  signOut
}

export default connect(null, mapDispatchToProps)(Logout)
