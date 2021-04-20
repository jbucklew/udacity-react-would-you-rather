import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

// Material UI
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { handleInitialData } from '../actions/shared';
import Login from './Login';
import Dashboard from './Dashboard';
import NavBar from './NavBar';
import QuestionPage from './QuestionPage';
import AddQuestion from './AddQuestion';
import LeaderBoard from './LeaderBoard';
import NoMatch404 from './NoMatch404';
import TitleBar from './TitleBar';
import '../css/app.css';

class App extends Component {

  // get starting application data using api
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <CssBaseline />
          <LoadingBar />
          <Container maxWidth='md'>
            <TitleBar />
            <NavBar />
          </Container>

          {this.props.loading === true
            ? null
            : this.props.authedUser === 'guest'
              ? <Login />
              : <div>
                  <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/question/:id' component={QuestionPage} />
                    <Route path='/add' exact component={AddQuestion} />
                    <Route path='/leaderboard' exact component={LeaderBoard} />
                    <Route path='*' component={NoMatch404} />
                  </Switch>
                </div>
          }
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  };
}

export default connect(mapStateToProps)(App);
