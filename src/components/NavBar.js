import React from 'react';
import { NavLink } from 'react-router-dom';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function NavBar () {
  return (
    <Toolbar component='nav' variant='dense' className='navbar-title'>
      <NavLink to='/' exact activeClassName='active' className='navbar-link'>
        <Typography variant='body2' noWrap>
          Home
        </Typography>
      </NavLink>

      <NavLink to='/add' exact activeClassName='active' className='navbar-link'>
        <Typography variant='body2' noWrap>
          Add Question
        </Typography>
      </NavLink>

      <NavLink to='/leaderboard' exact activeClassName='active' className='navbar-link'>
        <Typography variant='body2' noWrap>
          Leaderboard
        </Typography>
      </NavLink>

    </Toolbar>
  );
}
