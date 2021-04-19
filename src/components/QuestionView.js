import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

class QuestionView extends Component {

  render() {
    const { name, avatarURL } = this.props;

    return (
      <Tooltip title='Click to View' placement='bottom'>
        <Paper className='question-paper'>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Avatar alt={name} src={avatarURL} />
            </Grid>
            <Grid item xs={10}>
              <Typography variant='h6' noWrap gutterBottom>
                {name} asks
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='subtitle1' gutterBottom>Would you rather</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant='subtitle1' gutterBottom>{this.props.question.optionOne.text} ...?</Typography>
            </Grid>
          </Grid>
        </Paper>
     </Tooltip>
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const { author, optionOne } = question;
  const { name, avatarURL } = users[author];

  return {
    name,
    avatarURL,
    question: question
      ? {optionOne}
      : null
  };
}

export default connect(mapStateToProps)(QuestionView);
