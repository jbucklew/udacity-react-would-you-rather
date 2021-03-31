import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  handleOptionOneChange= (e) => {
    const optionOneText = e.target.value
    this.setState(() => ({
      optionOneText
    }))
  }

  handleOptionTwoChange= (e) => {
    const optionTwoText = e.target.value
    this.setState(() => ({
      optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const {optionOneText, optionTwoText} = this.state
    const {dispatch, authedUser} = this.props

    const question = {
      optionOneText,
      optionTwoText,
      author: authedUser
    }

    dispatch(handleAddQuestion(question))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }))
  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3>Add Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Option One'
            value={optionOneText}
            maxLength={100}
            onChange={this.handleOptionOneChange}
          />
          <input
            type='text'
            placeholder='Option Two'
            value={optionTwoText}
            maxLength={100}
            onChange={this.handleOptionTwoChange}
          />

          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(AddQuestion)
