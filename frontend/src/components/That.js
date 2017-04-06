import React from 'react'
import { connect } from 'react-redux'
import './That.css'

const That = ({ that }) =>
  <div className='that'>
    {that.name}({that.currentSaving}/{that.price})
  </div>

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
    that: state.thats.find(that => that.key === ownProps.routeParams.key)
  }
}
export default connect(mapStateToProps)(That)
