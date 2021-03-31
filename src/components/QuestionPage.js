import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
// import NewTweet from './NewTweet'

class QuestionPage extends Component {
  render() {
    const { id } = this.props

    return (
      <div>
        <h3 className='center'>Would you rather...</h3>
        <Question id={id} />
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }, props) {
  // get question id from url path
  const { id } = props.match.params

  return {
    id
  }
}

export default connect(mapStateToProps)(QuestionPage)
