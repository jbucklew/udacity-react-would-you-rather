import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class QuestionResults extends Component {

  render() {
    const { name, avatarURL, question, myVote } = this.props;
    const optOneVotes = question.optionOne.votes.length;
    const optTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optOneVotes + optTwoVotes;

    return (
      <Paper className='question-paper'>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar alt={name} src={avatarURL} />
          </Grid>
          <Grid item xs={10}>
            <Typography variant='h6' noWrap gutterBottom>
              {name} asked
              </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <div className={myVote === 'optionOne' ? 'my-vote-highlight' : 'question-result'}>
                  <p>Would you rather {question.optionOne.text}?</p>
                  <p>{optOneVotes} of {totalVotes} ({Math.round((optOneVotes/totalVotes) * 100)}%)</p>
                </div>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <div className={myVote === 'optionTwo' ? 'my-vote-highlight' : 'question-result'}>
                  <p>Would you rather {question.optionTwo.text}?</p>
                  <p>{optTwoVotes} of {totalVotes} ({Math.round((optTwoVotes/totalVotes) * 100)}%)</p>
                </div>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

function mapStateToProps ({ authedUser, questions, users }, { id }) {
  return {
    name: users[questions[id].author].name,
    avatarURL: users[questions[id].author].avatarURL,
    question: questions[id],
    myVote: users[authedUser].answers[id]
  };
}

export default connect(mapStateToProps)(QuestionResults);
