import React from 'react'
import { connect } from 'react-redux'
import { createThat } from '../reducers/thats'


class NewThat extends React.Component {
  constructor() {
    super()
    this.create = this.create.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

    this.state = {
      name: 'test',
      price: '1000',
      imageUrl: '',
      currentSaving: '50',
      deadline: ''
    }
  }

  create() {
    this.props.createThat(this.state)
  }

  handleUpdate(evt) {
    const name = evt.target.name
    const value = evt.target.value
    this.setState({ [name]: value })
  }

  render() {
    const { name, price, imageUrl, currentSaving, deadline } = this.state

    return (
      <div className='new-that'>
        <label htmlFor="name">Name: </label>
        <input name="name" value={name} onChange={this.handleUpdate}/>

        <label htmlFor="price">Price: </label>
        <input name="price" type='tel' value={price} onChange={this.handleUpdate}/>

        <label htmlFor="imageUrl">Image: </label>
        <input name="imageUrl" value={imageUrl} onChange={this.handleUpdate}/>

        <label htmlFor="currentSaving">Amount Already Saved: </label>
        <input name="currentSaving" type="tel" value={currentSaving} onChange={this.handleUpdate}/>

        <label htmlFor="deadline">Dealine: </label>
        <input name="deadline" type="date" value={deadline} onChange={this.handleUpdate}/>
        <button onClick={this.create} >Create</button>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createThat
}

export default connect(null, mapDispatchToProps)(NewThat)
