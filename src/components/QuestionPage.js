import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionAsk from './QuestionAsk'
import QuestionResults from './QuestionResults'

class QuestionPage extends Component {
  render() {
    const { id, answered } = this.props

    return (
      <div>
        <h3 className='center'>Would you rather...</h3>
        {answered
         ? <QuestionResults id={id} />
         : <QuestionAsk id={id} />
         }
      </div>
    )
  }
}

// TODO: If user answered the question show QuestionResults
// else show Question ask
function mapStateToProps ({ authedUser, users }, props) {
  // get question id from url path
  const { id } = props.match.params
  const answered = Object.keys(users[authedUser].answers).includes(id)

  return {
    id,
    answered
  }
}

export default connect(mapStateToProps)(QuestionPage)
