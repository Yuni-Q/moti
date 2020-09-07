import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import Login from '../components/Login';
import Main from '../components/Main';
import AnswerDetail from '../components/AnswerDetail';

interface Props {
	user: any;
	isOnboard: boolean;
	answers: any[];
	missions: any[];
	refresh: boolean;
	check: boolean;
}

const App: React.FC<Props> = ({ user, isOnboard, answers, missions, refresh, check }) => {
	const [isDetail, setIsDetail] = useState(false);
	if (isDetail) {
		return <AnswerDetail cardArray={answers} setIsDetail={setIsDetail} />;
	}

	if (!user) {
		return <Login />;
	}
	return (
		<Main
			isOnboard={isOnboard}
			answers={answers}
			missions={missions}
			refresh={refresh}
			check={check}
			setIsDetail={setIsDetail}
		/>
	);
};

export const getServerSideProps = async (context: any) => {
	const props = {
		user: null,
		isOnboard: false,
		answers: [],
		refresh: false,
		missions: [],
		check: false,
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

			const check = answers.data.data.answers.filter((answer: any) => {
				return answer.date === answers.data.data.today;
			});
			props.check = check.length > 0;

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
