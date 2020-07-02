import { NextPage } from 'next';
import React from 'react';
import { Store } from 'redux';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import Axios from 'axios';
import { loadUser } from '../../actions';
import { useSelector } from 'react-redux';

interface SageStore extends Store {
	sagaTask: {
		toPromise: () => void;
	}
}


interface Props {
}

const Main: NextPage<Props> = () => {
	const user = useSelector((state: any) => state.user)
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

	context.store.dispatch(loadUser(1))
	context.store.dispatch(END);
	await (context.store as SageStore).sagaTask.toPromise()
})
export default Main;
