import * as types from './types';
import { createAction } from 'redux-actions';

export const login = createAction(
  types.LOG_IN_REQUEST,
  (email: string, password: string) => ({email, password})
)
