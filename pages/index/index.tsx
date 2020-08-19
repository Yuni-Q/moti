import Axios from 'axios';
import {NextPage} from 'next';
import Link from 'next/link';
import React from 'react';
import {useSelector} from 'react-redux';
import {Store} from 'redux';
import {END} from 'redux-saga';
import {loadUser} from '../../actions';
import wrapper from '../../store/configureStore';

interface SageStore extends Store {
	sagaTask: {
		toPromise: () => void;
	};
}

interface Props {
	data: number;
}

const Main: NextPage<Props> = ({ data }) => {
	const user = useSelector((state: any) => state.user);
	return (
		<>
			<div className='m-1'>{user.me.name} {data}</div>
			<div className='m-sm-2'>{user.me.name} {data}</div>
			<div>
				<Link href="/posts/[id]" as="/posts/1">
					<a>
						posts로 이동
					</a>
				</Link>
			</div>
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
	return { props: { data: 123 } }
});
export default Main;
