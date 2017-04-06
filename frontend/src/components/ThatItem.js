import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const ThatItem = ({ that, push }) =>
  <div className='that' onClick={() => push(`/thats/${that.key}`)}>
    {that.name}({that.currentSaving}/{that.price})
  </div>

const mapDispatchToProps = {
  push
}

export default connect(null, mapDispatchToProps)(ThatItem)
