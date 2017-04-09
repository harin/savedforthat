import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const ThatItem = ({ that, push }) =>
  <div className='that' onClick={() => push(`/thats/${that.key}`)}>
    <img
      alt={that.name}
      src={"https://firebasestorage.googleapis.com/v0/b/savedforthat-83a18.appspot.com/o/Image%203.png?alt=media&token=5fe57852-a3bb-43c9-ae7e-b001fbadd3c7"}
    />
    <div className="text">
      {that.name}
    </div>
    <div className="progress-bar">
      <div
        className="progress"
        style={{ width: `${(that.currentSaving / that.price) * 100}%` }}
      >
      </div>
    </div>
  </div>

const mapDispatchToProps = {
  push
}

export default connect(null, mapDispatchToProps)(ThatItem)
