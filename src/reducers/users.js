import { RECEIVE_USERS, ADD_QUESTION_USER } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }

    case ADD_QUESTION_USER:
      console.log('add question user reducer')
      console.log(action)
      const {authedUser, qid} = action.question
      console.log(`authedUser ${authedUser} qid ${qid}`)
      console.log('state')
      console.log(state)

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([qid])
        }
      }
    default:
      return state
  }
}
