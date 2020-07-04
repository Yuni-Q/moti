import { HYDRATE } from 'next-redux-wrapper';
import { Action, combineReducers } from 'redux';
import { log } from '../utils/log';
import user from './user';

interface ReducersAction extends Action {
	payload: any;
}

const rootReducer = (state: any, action: ReducersAction) => {
	switch (action.type) {
		case HYDRATE:
			log('HYDRATE', action);
			return action.payload;
		default: {
			const combineReducer = combineReducers({
				user,
			});
			return combineReducer(state, action);
		}
	}
};
export default rootReducer;
