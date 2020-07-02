import { createAction } from 'redux-actions';
import * as types from './types';

export const loadUser = createAction(types.LOAD_USER_REQUEST, (userId: number) => ({ userId }));

export default null;
