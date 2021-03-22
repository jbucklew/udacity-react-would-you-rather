import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    selectedUser: '',
    loggedIn: false
  }

  handleChange = (e) => {
    const selectedUser = e.target.value

    this.setState(() => ({
      selectedUser
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { selectedUser } = this.state
    const { dispatch } = this.props

    dispatch(handleSetAuthedUser(selectedUser))

    this.setState(() => ({
      selectedUser: '',
      loggedUser: selectedUser ? false : true
    }))
  }

  render() {
    const {userIds} = this.props
    const {selectedUser} = this.state

    return (
      <div>
        <h3 className='center'>Select User</h3>
        <form className='' onSubmit={this.handleSubmit}>
          <select onChange={this.handleChange}>
            <option value=''>Select User...</option>
            {userIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <button className='btn' type='submit' disabled={selectedUser === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({users}) {
  return {
    userIds: Object.keys(users).sort()
  }
}

export default connect(mapStateToProps)(Login)
