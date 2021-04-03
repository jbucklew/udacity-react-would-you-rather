import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionResults extends Component {

  render() {
    const { name, question, myVote } = this.props
    const optOneVotes = question.optionOne.votes.length
    const optTwoVotes = question.optionTwo.votes.length
    const totalVotes = optOneVotes + optTwoVotes

    return (
      <div>
        <h3>{name} asks</h3>
        <p>Would you rather {question.optionOne.text}?</p>
        <p>{optOneVotes} of {totalVotes}</p>
        <p>Would you rather {question.optionTwo.text}?</p>
        <p>{optTwoVotes} of {totalVotes}</p>
        <p>My vote: {myVote}</p>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, questions, users}, {id}) {
  // const answered = Object.keys(users[authedUser].answers).includes(id)
  return {
    name: users[questions[id].author].name,
    question: questions[id],
    myVote: users[authedUser].answers[id]
  }
}

export default connect(mapStateToProps)(QuestionResults)
