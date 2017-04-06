import React from 'react'
import { connect } from 'react-redux'
import { signIn } from '../reducers/auth'


const Login = ({ signIn }) => {
  return (
    <div>
      <button onClick={signIn}>
        Login
      </button>
    </div>
  )
}

const mapDispatchToProp = {
  signIn
}
export default connect(null, mapDispatchToProp)(Login)
