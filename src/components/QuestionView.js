import React, { Component } from 'react'
import { connect } from 'react-redux'

// TODO: vary depending on whether or not unanswered, answered
// list is showing
class QuestionView extends Component {
  render() {
    return (
      <div>
        <p>{this.props.name} asks</p>
        <p>avatar {this.props.avatarURL}</p>
        <p>Would you rather?</p>
        <p>{this.props.question.optionOne.text} ...</p>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, {id}) {
  const question = questions[id]
  const { author, optionOne } = question
  const { name, avatarURL } = users[author]

  return {
    name,
    avatarURL,
    question: question
      ? {optionOne}
      : null
  }
}

export default connect(mapStateToProps)(QuestionView)
