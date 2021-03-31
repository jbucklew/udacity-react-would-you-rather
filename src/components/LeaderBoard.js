import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  render() {
    return (
      <div>
        <h3>Would You Rather Leaders</h3>
        <ul>
          {this.props.leaders.map((id) => (
            <li key={id}>
              {this.props.users[id].name} <br />
              {this.props.users[id].avatarURL} <br />
              {Object.keys(this.props.users[id].answers).length} <br />
              {this.props.users[id].questions.length} <br />
              <p>ADD TOTAL</p>
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
