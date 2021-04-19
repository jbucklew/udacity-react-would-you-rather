import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class LeaderBoard extends Component {
  render() {
    const { leaders, users, authedUser } = this.props;

    return (
      <Container maxWidth='sm'>
        <Typography variant='h5' noWrap align='center' gutterBottom>Leaderboard</Typography>

        <Grid container justify='center' align-items='center' direction='column' spacing={1}>
        {leaders.map((id) => (
          <Grid item xs={12} key={id}>
            <Paper className={id === authedUser ? 'question-paper my-vote-highlight' : 'question-paper'}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Avatar alt={users[id].name} src={users[id].avatarURL} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='h6' gutterBottom>
                    {users[id].name}
                  </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <p>Questions Answered: {Object.keys(users[id].answers).length}</p>
                  <p>Questions Asked: {users[id].questions.length}</p>
                </Grid>
                <Grid item xs={2}>
                  <p>Score</p>
                  <p>{Object.keys(users[id].answers).length + users[id].questions.length}</p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  // sort user list descending by sum of questions answered and
  // questions asked
  const leaders = Object.keys(users)
    .sort((a, b) => {
      const userB = Object.keys(users[b].answers).length + users[b].questions.length;
      const userA = Object.keys(users[a].answers).length + users[a].questions.length;
      return userB - userA;
    });

  return {
    leaders,
    users,
    authedUser
  };
}

export default connect(mapStateToProps)(LeaderBoard);
