import * as types from './types';
import { createAction } from 'redux-actions';

export const loadUser = createAction(
  types.LOAD_USER_REQUEST,
  (userId: number) => ({ userId })
)
