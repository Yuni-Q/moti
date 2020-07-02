import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS } from '../actions/types';
import { UserAction } from '../reducers/user';

// LOAD_USER
// function loadUserAPI({ userId }: any) {
//	return
// }

function* loadUser(action: UserAction) {
	try {
		// const { email, password } = action.payload;
		// const result = yield call(logInAPI, { email, password });
		// const { user, key } = result.data;
		// document.cookie = `token=${key}; path=/`;
		// document.cookie = `pk=${user.pk}; path=/`;
		yield delay(2000);
		console.log(action.payload.userId);
		yield put({
			type: LOAD_USER_SUCCESS,
			payload: {
				id: action.payload.userId,
				name: 'yuni-q',
			},
		});
	} catch (error) {
		yield put({
			type: LOAD_USER_FAILURE,
			playload: error,
		});
	}
}

function* watchLoadUser() {
	yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
	yield all([fork(watchLoadUser)]);
}
