import React from 'react'
import { connect } from 'react-redux'
import './That.css'
import { addSaving } from '../reducers/thats'

const That = ({ that, addSaving }) =>
  <div className='that'>
    {that.name}({that.currentSaving}/{that.price})
    <input name="newsaving" type="tel" />
    <button
      onClick={() => {
        const input = document.querySelector('input[name=newsaving]')
        console.log(input, input.value)
        addSaving(that.key, parseInt(input.value, 10))
      }}
    >Add Savings</button>
  </div>

const mapDispatchToProps = {
  addSaving
}
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
    that: state.thats.find(that => that.key === ownProps.routeParams.key)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(That)
