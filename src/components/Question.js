import React, { Component } from 'react'
import { connect } from 'react-redux'

// TODO: vary display depending on whether or not the authedUser
// already answered the question
class Question extends Component {
  state = {
    selectedOption: null
  }

  handleClick = (e) => {
    const selectedOption = e.target.value

    this.setState(() => ({
      selectedOption
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

  }

  render() {
    const {answered, name, question} = this.props

    return (
      <div>
        <h3>{name} asks</h3>
        <h4>Would you rather</h4>
        {answered
          ? null
          : (
            <form onSubmit={this.handleSubmit}>
              <input
                type='radio'
                name='options'
                value='optionOne'
                onClick={this.handleClick} /> {question.optionOne.text}
              <input
                type='radio'
                name='options'
                value='optionTwo'
                onClick={this.handleClick} /> {question.optionTwo.text}
              <button
                type='submit'
                disabled={this.state.selectedOption === null}>
                Submit
              </button>
            </form>
          )
         }
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, {id}) {
  const question = questions[id]
  // TODO: check users[authedUser] to see if user answered question
  // if not, display options and submit results
  const { optionOne, optionTwo } = question

  const answered = Object.keys(users[authedUser].answers).includes(id)

  return {
    answered,
    name: users[authedUser].name,
    question: question
      ? {optionOne, optionTwo}
      : null
  }
}

export default connect(mapStateToProps)(Question)
