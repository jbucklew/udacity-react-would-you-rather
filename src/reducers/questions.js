import { ADD_QUESTION, RECEIVE_QUESTIONS } from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }

    case ADD_QUESTION:
      const { question } = action

      return {
        ...state,
        [question.id]: question
      }

    // case SAVE_ANSWER:
    //   // TODO: need to add answer to users[authedUser].answers
    //   // TODO: need to add authedUser to
    //   // TODO: questions[qid].optionOne/Two.votes
    //   const { answer } = action

    //   return {
    //     ...state,

    //   }

    default:
      return state
  }
}
