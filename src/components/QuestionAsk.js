import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveAnswer } from '../actions/questions';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

class QuestionAsk extends Component {
  // component state used to track the users response.
  state = {
    selectedOption: null
  }

  // update component state when user response is selected or changed
  handleChange = (e) => {
    const selectedOption = e.target.value;

    this.setState(() => ({
      selectedOption
    }));
  }

  // save user selection and reset component state
  handleSubmit = (e) => {
    e.preventDefault();

    const { selectedOption } = this.state;
    const { dispatch, authedUser, id } = this.props;

    dispatch(handleSaveAnswer({
      authedUser,
      qid: id,
      answer: selectedOption
    }));

    this.setState(() => ({
      selectedOption: null
    }));
  }

  render() {
    const { name, avatarURL, question } = this.props;
    const { selectedOption } = this.state;

    return (
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
          <Grid item xs={12}>
            <form onSubmit={this.handleSubmit}>
              <Grid container justify='center' alignItems='center' direction='column' spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='subtitle1' noWrap align='center' gutterBottom>Would you rather</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup name="options" value={selectedOption} onChange={this.handleChange}>
                      <FormControlLabel value="optionOne" control={<Radio />} label={`${question.optionOne.text}?`} />
                      <FormControlLabel value="optionTwo" control={<Radio />} label={`${question.optionTwo.text}?`} />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={selectedOption === null}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const { optionOne, optionTwo, author } = question;

  return {
    authedUser,
    name: users[author].name,
    avatarURL: users[author].avatarURL,
    question: question
      ? { optionOne, optionTwo }
      : null
  };
}

export default connect(mapStateToProps)(QuestionAsk);
