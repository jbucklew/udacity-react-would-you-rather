import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'

class UserNav extends Component {
  handleClick = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleSetAuthedUser('guest'))
  }

  render() {
    const { userName } = this.props

    return (
      <span>
        {userName === null
          ? null
          : <ul><li>
            <span>{this.props.userName}</span>
          </li>
            <li>
              <button onClick={this.handleClick}>Logout</button>
            </li>
          </ul>
        }
      </span>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  let userName = null
  if (authedUser && authedUser !== 'guest') {
    userName = users[authedUser].name
  }
  return {
    userName: userName
  }
}
export default connect(mapStateToProps)(UserNav)
