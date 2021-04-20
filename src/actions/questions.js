import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_ANSWER = 'SAVE_ANSWER';

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
};

export function handleAddQuestion (question) {
  return (dispatch) => {
    dispatch(showLoading());

    // When dispatching, the ADD_QUESTION actions gets passed to all
    // reducers, so can handle in both question and users reducers without
    // having to dispatch 2 separate actions since question has all the
    // data needed for both
    return saveQuestion(question)
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

function saveAnswer (answer) {
  return {
    type: SAVE_ANSWER,
    answer
  };
}

export function handleSaveAnswer (answer) {
  return (dispatch) => {
    dispatch(showLoading())

    // use api to save answer then update state
    return saveQuestionAnswer(answer)
      .then(() => dispatch(saveAnswer(answer)))
      .then(() => dispatch(hideLoading()));
  };
}
