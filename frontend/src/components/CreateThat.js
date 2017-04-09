import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
const CreateThat = ({ push }) => {
  return (
    <button
      className='create-that'
      onClick={() => push('/thats/new')}
    >
      <div></div>
      <div></div>
    </button>
  )
}

const mapDispatchToProps = {
  push
}

export default connect(null, mapDispatchToProps)(CreateThat)
