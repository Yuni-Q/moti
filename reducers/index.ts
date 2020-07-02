import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, Action } from 'redux';
import user from './user';

interface ReducersAction extends Action {
	payload: any;
}

const rootReducer = (state: any, action: ReducersAction) => {
	switch (action.type) {
		case HYDRATE:
			console.log('HYDRATE', action)
			return action.payload;
		default: {
			const combineReducer = combineReducers({
				user,
			});
			return combineReducer(state, action)
		}
	}
}
export default rootReducer;
