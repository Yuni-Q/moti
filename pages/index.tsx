import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AnswerDetail from '../components/AnswerDetail';
import Login from '../components/Login';
import Main from '../components/Main';
import Answer from '../models/Answer';
import Mission from '../models/Mission';
import Signin from '../models/Signin';
import User from '../models/User';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { PageContext } from './_app';

interface Props {
	user: User;
	isOnboard: boolean;
	initAnswers: Answer[];
	initMissions: Mission[];
	initCanRefresh: boolean;
	isTodayAnswer: boolean;
}

const App: React.FC<Props> = ({ user, isOnboard, initAnswers, initMissions, initCanRefresh, isTodayAnswer }) => {
	const router = useRouter();
	const [answers, setAnswers] = useState([] as Answer[]);
	const [missions, setMission] = useState(initMissions);
	const [canRefresh, setCanRefresh] = useState(initCanRefresh);

	useEffect(() => {
		const params = new URL(window.location.href).searchParams;
		const code = params.get('code');
		const token = Cookie.getToken();
		if(!token && code) {
			try {
				const getToken = async () => {
					const {accessToken: newToken} = await Signin.postSigninGoogle({code});
					if(newToken) {
						Cookie.setToken({token: newToken})
						router.reload();	
					}
				}
				getToken();
			} catch(error) {
				consoleError('error', error.response)
			}
			
		}
	},[router])

	const onChangeAnswers = (newAnswers: Answer[]) => {
		setAnswers(newAnswers);	
	}
	
	const onChangeMission = (newMissions: Mission[]) => {
		setMission(newMissions);
	}

	const onChangeCanRefresh = (newCanRefresh: boolean) => {
		setCanRefresh(newCanRefresh)
	}

	if (!user.id) {
		return <Login />;
	}
	
	if (answers.length > 0) {
		return <AnswerDetail answers={answers} onChangeAnswers={onChangeAnswers} />;
	}
	
	return (
		<Main
			isOnboard={isOnboard}
			answers={initAnswers}
			missions={missions}
			cnaRefresh={canRefresh}
			isTodayAnswer={isTodayAnswer}
			onChangeAnswers={onChangeAnswers}
			onChangeMission={onChangeMission}
			onChangeCanRefresh={onChangeCanRefresh}
		/>
	);
};

interface ServerSideProps {
	props: {
		user: User,
		initAnswers: Answer[],
		initMissions: Mission[],
		isTodayAnswer: boolean,
		isOnboard: boolean,
		initCanRefresh: boolean,
	}
}

export const getServerSideProps = async ({req}: PageContext): Promise<ServerSideProps | void> => {
	const props = {
		user: {} as User,
		initAnswers: [] as Answer[],
		initMissions: [] as Mission[],
		isTodayAnswer: false,
		isOnboard: false,
		initCanRefresh: false,
	};
	try {
		const token = Cookie.getToken(req);
		if(!token) {
            return { props };
		}

		props.isOnboard = !!Cookie.getOnboard(req);
		
		const user = await User.getUsersMy({token})
		if(!user) {
			return { props };
		}
		props.user = user;
		
		const {today, answers} = await Answer.getAnswersWeek({token})
		props.initAnswers = answers;

		const isTodayAnswer = answers.filter((answer) => {
			return answer.date === today;
		}).length > 0;
		props.isTodayAnswer = isTodayAnswer;

		const {missions, refresh} = await Mission.getMissions({token});
		props.initMissions = missions;
		props.initCanRefresh = refresh;
		
		return {
			props,
		};
	} catch (error) {
		consoleError('error', error);
		return {
			props,
		};
	}
};

export default App;
