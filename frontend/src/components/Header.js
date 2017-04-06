import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'

const Header = ({ user, push }) => {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/thats'>Thats</Link>
      {user.displayName}
    </div>
  )
}

const mapDispatchToProps = {
  push
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

