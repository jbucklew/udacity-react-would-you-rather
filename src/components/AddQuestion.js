import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

// Material UI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  handleOptionOneChange= (e) => {
    const optionOneText = e.target.value;
    this.setState(() => ({
      optionOneText
    }));
  }

  handleOptionTwoChange= (e) => {
    const optionTwoText = e.target.value;
    this.setState(() => ({
      optionTwoText
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, authedUser } = this.props;

    const question = {
      optionOneText,
      optionTwoText,
      author: authedUser
    };

    dispatch(handleAddQuestion(question));

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }));
  }

  // this redirects right away instead of waiting for the
  // question to be submitted.
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <Container maxWidth='xs'>
        <Typography variant='h5' noWrap align='center' gutterBottom>Would You Rather</Typography>
        <div className='add-question-container'>
          <form className='new-question-form' onSubmit={this.handleSubmit}>
            <Box className='field-m'>
              <TextField
                required
                id='option-one'
                label='Option One'
                onChange={this.handleOptionOneChange}
                value={optionOneText}
                variant='outlined'
                size='small'
                fullWidth
              />
            </Box>
            <Box className='field-m'>
              <TextField
                required
                id='option-two'
                label='Option Two'
                onChange={this.handleOptionTwoChange}
                value={optionTwoText}
                variant='outlined'
                size='small'
                fullWidth
              />
            </Box>

            <Button
              fullWidth
              className='add-question-submit-button'
              variant='contained'
              color='primary'
              type='submit'
              disabled={optionOneText === '' || optionTwoText === ''}>
              Submit
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(AddQuestion);
