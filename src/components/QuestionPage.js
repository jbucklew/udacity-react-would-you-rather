import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionAsk from './QuestionAsk'
import QuestionResults from './QuestionResults'

class QuestionPage extends Component {
  render() {
    const { id, questionFound, answered } = this.props

    return (
      <div>
        { questionFound
          ? answered
            ? <QuestionResults id={id} />
            : <QuestionAsk id={id} />
          : (<h3>Error: Question with {id} not found.</h3>)
        }

      </div>
    )
  }
}

// TODO: show a 404 error if question id doesn't exist

// TODO: If user answered the question show QuestionResults
// else show Question ask
function mapStateToProps({ authedUser, users, questions }, props) {
  // get question id from url path
  const { id } = props.match.params
  const questionFound = questions[id] ? true : false
  const answered = Object.keys(users[authedUser].answers).includes(id)

  return {
    id,
    questionFound,
    answered
  }
}

export default connect(mapStateToProps)(QuestionPage)
