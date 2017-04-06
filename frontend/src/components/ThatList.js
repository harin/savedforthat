import React from 'react'
import { connect } from 'react-redux'
import That from './That'
import CreateThat from './CreateThat'
import ThatItem from './ThatItem'

const ThatList = ({ thats }) => {
  return (
    <div className="that-list">
      {thats.map((that, index) =>
        <ThatItem key={index} that={that} />
      )}
      <CreateThat />
    </div>
  )
}

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  thats: state.thats
})

export default connect(mapStateToProps, mapDispatchToProps)(ThatList)
