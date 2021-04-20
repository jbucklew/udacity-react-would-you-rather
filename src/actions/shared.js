import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

// guest is used when no one is logged in
const AUTHED_ID = 'guest';

// get application starting data
export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      });
  };
}
