import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddQuestion extends Component {
  render() {
    return (
      <div>Add Question</div>
    )
  }
}

export default connect()(AddQuestion)
