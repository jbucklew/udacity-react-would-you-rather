import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    return (
      <div>
        <p>{this.props.question.optionOne.text}</p>
        <p>{this.props.question.optionTwo.text}</p>
        <p>{this.props.question.timestamp}</p>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, {id}) {
  const question = questions[id]
  const { optionOne, optionTwo, timestamp } = question

  return {
    authedUser,
    question: question
      ? {optionOne, optionTwo, timestamp}
      : null
  }
}

export default connect(mapStateToProps)(Question)
