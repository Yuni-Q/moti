import Axios from 'axios';
import { NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import { END } from 'redux-saga';
import { loadUser } from '../../actions';
import wrapper from '../../store/configureStore';

interface SageStore extends Store {
	sagaTask: {
		toPromise: () => void;
	};
}

const Main: NextPage = () => {
	const user = useSelector((state: any) => state.user);
	return (
		<>
			<div>{user.me.name}</div>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	Axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		Axios.defaults.headers.Cookie = cookie;
	}

	context.store.dispatch(loadUser(1));
	context.store.dispatch(END);
	/* eslint-disable */
	await (context.store as SageStore).sagaTask.toPromise();
	/* eslint-enable */
});
export default Main;
