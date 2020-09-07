import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
import Login from '../components/Login';
import Main from '../components/Main';

interface Props {
	user: any;
	isOnboard: boolean;
	answers: any[];
	missions: any[];
	refresh: boolean;
}

const App: React.FC<Props> = ({ user, isOnboard, answers, missions, refresh }) => {
	if (!user) {
		return <Login />;
	}
	return <Main isOnboard={isOnboard} answers={answers} missions={missions} refresh={refresh} />;
};

export const getServerSideProps = async (context: any) => {
	const props = {
		user: null,
		isOnboard: false,
		answers: [],
		refresh: false,
		missions: [],
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
		if (props.user) {
			const answers = await axios.get('https://moti.company/api/v1/answers/week', {
				headers: { Authorization: token },
			});
			props.answers = answers.data.data.answers;

			const missions = await axios.get('https://moti.company/api/v1/missions', {
				headers: { Authorization: token },
			});
			props.missions = missions.data.data.missions;
			props.refresh = missions.data.data.refresh;
		}
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
