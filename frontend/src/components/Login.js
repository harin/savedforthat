import React from 'react'
import { connect } from 'react-redux'
import { signIn } from '../reducers/auth'
import signInWithGoogle from '../btn_google_signin_light_normal_web@2x.png'

const Login = ({ signIn }) => {
  return (
    <div className="login">
      <img
        alt='Sign in with Google'
        onClick={signIn}
        src={signInWithGoogle}
        width="191px"
        height="48px"
      />
    </div>
  )
}

const mapDispatchToProp = {
  signIn
}
export default connect(null, mapDispatchToProp)(Login)
