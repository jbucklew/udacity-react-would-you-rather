import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js';

// get user and question data from data source
export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }));
}

export function saveQuestion (question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer (answer) {
  return _saveQuestionAnswer(answer);
}
