import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Material UI
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import QuestionView from './QuestionView';

class Dashboard extends Component {
  // component state used to determine which questions to display
  // unanswered (default) or answered.
  state = {
    showQuestionType: 'unanswered'
  }

  // toggle the question type displayed, unanswered or answered
  handleChange = (e, value) => {
    const showQuestionType = value;

    this.setState(() => ({
      showQuestionType
    }));
  }

  render() {
    const { showQuestionType } = this.state;

    return (
      <Container maxWidth='sm'>
        <Typography variant='h5' noWrap align='center' gutterBottom>
          Questions
        </Typography>

        <div className='dashboard-container'>
          <Tabs
            value={showQuestionType}
            onChange={this.handleChange}
            indicatorColor='secondary'
            textColor='primary'
            centered
          >
            <Tab label='Unanswered' value='unanswered' />
            <Tab label='Answered' value='answered' />
          </Tabs>

          <div className='questions-container'>
            {this.props[this.state.showQuestionType].length > 0
              ? this.props[this.state.showQuestionType].map((id) => (
                  <Link key={id} to={`/question/${id}`} className='question-link'>
                    <QuestionView id={id} />
                  </Link>
                ))
              : ( <div>
                    <p>No {this.state.showQuestionType} questions found.</p>
                  </div>
                )
            }
          </div>
        </div>
      </Container>
    );
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  // sort answered and unanswered questions in descending order by time
  const sortedQuestions = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  const userAnswered = Object.keys(users[authedUser].answers);

  const unanswered = sortedQuestions.filter((e) => {
    return userAnswered.includes(e) ? null : e
  }, userAnswered);

  const answered = sortedQuestions.filter((e) => {
    return userAnswered.includes(e) ? e : null
  }, userAnswered);

  return {
    unanswered: unanswered,
    answered: answered
  };
}

export default connect(mapStateToProps)(Dashboard);
