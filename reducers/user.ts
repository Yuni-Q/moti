import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS } from "../actions/types";
import produce from 'immer';
import { Action } from "redux-actions";

export const initialState = {
  pk: '',
  email: '',
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
};

interface payload {
  error?: string
  pk?: string;
  email: string
}

export type UserAction = Action<payload>;

export default (state = initialState, action: UserAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.isLoggingIn = true;
        draft.logInErrorReason = '';
        break;
      case LOG_IN_SUCCESS:
        const { pk, email } = action.payload;
        draft.email = email;
        draft.pk = pk || email;
        draft.isLoggingIn = false;
        break;
      case LOG_IN_FAILURE:
        draft.isLoggingIn = false;
        draft.logInErrorReason = action.payload.error || JSON.stringify(action.error)
        break;
      default: {
        break;
      }
    }

  })

}