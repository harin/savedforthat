import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
const CreateThat = ({ push }) => {
  return (
    <button
      onClick={() => push('/thats/new')}
    >
      CreateThat
    </button>
  )
}

const mapDispatchToProps = {
  push
}

export default connect(null, mapDispatchToProps)(CreateThat)
