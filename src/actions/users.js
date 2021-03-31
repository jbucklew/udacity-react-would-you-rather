export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

function addQuestionUser(question) {
  return {
    type: ADD_QUESTION_USER,
    question
  }
}

// question = {author, qid}
export function handleAddQuestionUser(question) {
  return (dispatch) => {
    const authedUser = question.question.author
    const qid = question.question.id

    dispatch(addQuestionUser({authedUser, qid}))
  }
}
