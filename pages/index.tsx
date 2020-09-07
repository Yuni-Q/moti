import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
import Login from '../components/Login';
import Main from '../components/Main';

interface Props {
	user: any;
	isOnboard: boolean;
}

const App: React.FC<Props> = ({ user, isOnboard }) => {
	if (!user) {
		return <Login />;
	}
	return <Main isOnboard={isOnboard} />;
};

export const getServerSideProps = async (context: any) => {
	const props = {
		user: null,
		isOnboard: false,
	};
	try {
		const cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
		props.isOnboard = !!cookies.get('onboard');
		if (!cookies.get('token')) {
			return {
				props,
			};
		}
		const token = cookies.get('token');
		const result = await axios.get('https://moti.company/api/v1/users/my', {
			headers: { Authorization: token },
		});
		props.user = result.data.data;
		return {
			props,
		};
	} catch (error) {
		console.log(error.message);
		return {
			props,
		};
	}
};

export default App;
