import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import '../styles/Header.css'

const Header = ({ user, push }) => {
  return (
    <header>
      <div
        className="logo"
        onClick={() => push('/thats')}
      >
        sft
      </div>
      {/*{user.displayName}*/}
    </header>
  )
}

const mapDispatchToProps = {
  push
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

