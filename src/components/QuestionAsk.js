import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/questions'

class QuestionAsk extends Component {
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

    const { selectedOption } = this.state
    const { dispatch, authedUser, id } = this.props

    dispatch(handleSaveAnswer({
      authedUser,
      qid: id,
      answer: selectedOption
    }))

    this.setState(() => ({
      selectedOption: null
    }))
  }

  render() {
    const { name, question } = this.props

    return (
      <div>
        <h3>{name} asks</h3>
        <h4>Would you rather</h4>

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
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]
  const { optionOne, optionTwo, author } = question

  return {
    authedUser,
    name: users[author].name,
    question: question
      ? { optionOne, optionTwo }
      : null
  }
}

export default connect(mapStateToProps)(QuestionAsk)
