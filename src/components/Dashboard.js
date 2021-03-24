import React, { Component } from 'react';
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  state = {
    showQuestionType: 'unanswered'
  }

  handleClick = (e) => {
    const showQuestionType = e.target.value

    this.setState(() => ({
      showQuestionType
    }))
  }

  render() {
    return (
      <div>
        <h3 className='center'>Questions</h3>
        <input type='radio' name='questionType' value='unanswered' onClick={this.handleClick} /> Unanswered
        <input type='radio' name='questionType' value='answered' onClick={this.handleClick} /> Answered
        <hr />
        <ul className='question-list'>
          {this.props[this.state.showQuestionType].map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({questions, users, authedUser}) {
  const sortedQuestions = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  const userAnswered = Object.keys(users[authedUser].answers)

  const unanswered = sortedQuestions.filter((e) => {
    return userAnswered.includes(e) ? null : e
  }, userAnswered)

  const answered = sortedQuestions.filter((e) => {
    return userAnswered.includes(e) ? e : null
  }, userAnswered)

  return {
    unanswered: unanswered,
    answered: answered
  }
}

export default connect(mapStateToProps)(Dashboard)
