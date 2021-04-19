import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import QuestionAsk from './QuestionAsk';
import QuestionResults from './QuestionResults';

class QuestionPage extends Component {
  render() {
    const { id, questionFound, answered } = this.props;

    return (
      <Container maxWidth='sm'>
        <div className='dashboard-container'>
        { questionFound
          ? answered
            ? <QuestionResults id={id} />
            : <QuestionAsk id={id} />
          : (<Typography variant='h3'>Error: Question with {id} not found.</Typography>)
        }
        </div>
      </Container>
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, props) {
  // get question id from url path
  const { id } = props.match.params;
  const questionFound = questions[id] ? true : false;
  const answered = Object.keys(users[authedUser].answers).includes(id);

  return {
    id,
    questionFound,
    answered
  };
}

export default connect(mapStateToProps)(QuestionPage);
