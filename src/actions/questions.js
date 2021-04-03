import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

// question is an object in the following format
// {optionOneText, optionTwoText, author} author=user id
function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

// TODO: this function uses the api to save the question to the db
// then dispatches the addQuestion action.  The addQuestion action
// contains the type and question above as an object.  The
// addQuestion reducer is then run to update the store.
export function handleAddQuestion (question) {
  return (dispatch) => {
    dispatch(showLoading())

    // saveQuestion uses api to save to db
    // then addQuestion to store
    // NOTE: when dispatching, the ADD_QUESTION actions gets passed to all
    // reducers, so can handle in both question and users reducers without
    // having to dispatch 2 separate actions since question has all the
    // data needed for both
    return saveQuestion(question)
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

// answer is an object with the following properties
// { authedUser, qid, answer }
function saveAnswer (answer) {
  return {
    type: SAVE_ANSWER,
    answer
  }
}

export function handleSaveAnswer (answer) {
  return (dispatch) => {
    dispatch(showLoading())

    // TODO: saveQuestionAnswer returns a promise but does not return
    // any data (answer)
    return saveQuestionAnswer(answer)
      .then(() => dispatch(saveAnswer(answer)))
      .then(() => dispatch(hideLoading()))
  }
}
