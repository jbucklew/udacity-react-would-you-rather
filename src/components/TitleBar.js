import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSetAuthedUser } from '../actions/authedUser';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';



class TitleBar extends Component {

  handleClick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(handleSetAuthedUser('guest'));
  }

  render() {
    const { userName } = this.props;

    return (
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' noWrap className='toolbar-title'>
              Would You Rather...?
          </Typography>

          {userName && (
            <Typography variant='h6'>{this.props.userName}
              <Tooltip title='Logout'>
                <IconButton aria-label='logout' onClick={this.handleClick}>
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </Typography>
        )}

        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps ({ authedUser, users }) {
  let userName = null;
  if (authedUser && authedUser !== 'guest') {
    userName = users[authedUser].name;
  }
  return {
    userName: userName
  };
}

export default connect(mapStateToProps)(TitleBar);
