import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from "../actions/types";
import produce from 'immer';
import { Action } from "redux-actions";

export const initialState: {
  me: any;
  loadUserLoading: boolean;
  loadUserDone: boolean;
  loadUserError: any;
} = {
  me: null,
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
};

interface payload {
  error?: string;
  user: any;
  [key: string]: any;
}

export type UserAction = Action<payload>;

export default (state = initialState, action: UserAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      case LOAD_USER_SUCCESS:
        draft.me = action.payload;
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.loadUserError = null;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.loadUserError = action.error;
        break;
      default: {
        break;
      }
    }

  })

}