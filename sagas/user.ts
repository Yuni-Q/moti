import Router from 'next/router';
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST } from '../actions/types';
import { UserAction } from '../reducers/user';

// LOG_IN
//function logInAPI({ email, password }: any) {
//	return
//}

function* logIn(action: UserAction) {
	try {
		//const { email, password } = action.payload;
		//const result = yield call(logInAPI, { email, password });
		//const { user, key } = result.data;
		//document.cookie = `token=${key}; path=/`;
		//document.cookie = `pk=${user.pk}; path=/`;
		yield delay(2000);
		yield put({
			type: LOG_IN_SUCCESS,
			payload: action.payload,
		});
		Router.replace('/');
	} catch (e) {
		console.error(e.response);
		alert('입력하신 아이디/비밀번호에 해당하는 계정이 없습니다.');
		yield put({
			type: LOG_IN_FAILURE,
		});
	}
}

function* watchLogIn() {
	yield takeLatest(LOG_IN_REQUEST, logIn);
}


export default function* userSaga() {
	yield all([
		fork(watchLogIn),
	]);
}
