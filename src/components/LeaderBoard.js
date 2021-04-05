import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  render() {
    const { leaders, users } = this.props

    return (
      <div>
        <h3>Would You Rather Leaders</h3>
        <ul>
          {leaders.map((id) => (
            <li key={id}>
              {users[id].name} <br />
              {users[id].avatarURL} Avatar <br />
              {Object.keys(users[id].answers).length}
              {users[id].questions.length}
              {Object.keys(users[id].answers).length + users[id].questions.length} <br />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  // sort user list descending by sum of questions answered and
  // questions asked
  const leaders = Object.keys(users)
    .sort((a, b) => {
      const userB = Object.keys(users[b].answers).length + users[b].questions.length;
      const userA = Object.keys(users[a].answers).length + users[a].questions.length;
      return userB - userA
    })

  return {
    leaders,
    users
  }
}

export default connect(mapStateToProps)(LeaderBoard)
