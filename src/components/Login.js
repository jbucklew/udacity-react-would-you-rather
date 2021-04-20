import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSetAuthedUser } from '../actions/authedUser';

// Material UI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



class Login extends Component {
  // component state to track user selected from the drop-down
  state = {
    selectedUser: '',
    loggedIn: false
  }

  // update component state when drop-down value changes
  handleChange = (e) => {
    const selectedUser = e.target.value;

    this.setState(() => ({
      selectedUser
    }));
  }

  // on submit dispatch selected user action and reset component state
  handleSubmit = (e) => {
    e.preventDefault();

    const { selectedUser } = this.state;
    const { dispatch } = this.props;

    dispatch(handleSetAuthedUser(selectedUser));

    this.setState(() => ({
      selectedUser: '',
      loggedUser: selectedUser ? false : true
    }));
  }

  render() {
    const { userIds } = this.props;
    const { selectedUser } = this.state;

    return (
      <Container maxWidth='xs'>
        <div className='login-container'>
          <form className='login-form' onSubmit={this.handleSubmit}>
            <FormControl variant='outlined' fullWidth margin='normal'>
              <InputLabel id='select-user-label'>Select User</InputLabel>
              <Select
                labelId='select-user-label'
                id='select-user'
                fullWidth
                onChange={this.handleChange}
                label='Select User'
                value={selectedUser}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {userIds.map((id) => (
                  <MenuItem key={id} value={id}>{id}</MenuItem>

                ))}
              </Select>
            </FormControl>

            <Button
              fullWidth
              className='login-submit-button'
              variant='contained'
              color='primary'
              type='submit'
              disabled={selectedUser === ''}>
              Login
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

// get list of available user ids.
function mapStateToProps ({ users }) {
  return {
    userIds: Object.keys(users).sort()
  };
}

export default connect(mapStateToProps)(Login);
