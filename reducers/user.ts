import produce from 'immer';
import { Action } from 'redux-actions';
import { LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS } from '../actions/types';

interface State {
	me: any;
	loadUserLoading: boolean;
	loadUserDone: boolean;
	loadUserError: any;
}

export const initialState: State = {
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
	});
};
