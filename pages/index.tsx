import React, { useState } from 'react';
import AnswerDetail from '../components/AnswerDetail';
import Login from '../components/Login';
import Main from '../components/Main';
import Answer from '../models/Answer';
import Mission from '../models/Mission';
import User from '../models/User';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { PageContext } from './_app';

interface Props {
	user: User;
	isOnboard: boolean;
	answers: Answer[];
	missions: Mission[];
	cnaRefresh: boolean;
	isTodayAnswer: boolean;
}

const App: React.FC<Props> = ({ user, isOnboard, answers, missions, cnaRefresh, isTodayAnswer }) => {
	const [isDetail, setIsDetail] = useState(false);

	const onChangeAnswers = () => {
		setIsDetail(false);	
	}

	if (!user.id) {
		return <Login />;
	}
	
	if (isDetail) {
		return <AnswerDetail answers={answers} onChangeAnswers={onChangeAnswers} />;
	}
	
	return (
		<Main
			isOnboard={isOnboard}
			answers={answers}
			missions={missions}
			cnaRefresh={cnaRefresh}
			isTodayAnswer={isTodayAnswer}
			setIsDetail={setIsDetail}
		/>
	);
};

interface ServerSideProps {
	props: {
		user: User,
		answers: Answer[],
		missions: Mission[],
		isTodayAnswer: boolean,
		isOnboard: boolean,
		cnaRefresh: boolean,
	}
}

export const getServerSideProps = async ({req}: PageContext): Promise<ServerSideProps | void> => {
	const props = {
		user: {} as User,
		answers: [] as Answer[],
		missions: [] as Mission[],
		isTodayAnswer: false,
		isOnboard: false,
		cnaRefresh: false,
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
		props.answers = answers;

		const isTodayAnswer = answers.filter((answer) => {
			return answer.date === today;
		}).length > 0;
		props.isTodayAnswer = isTodayAnswer;

		const {missions, refresh} = await Mission.getMissions({token});
		props.missions = missions;
		props.cnaRefresh = refresh;
		
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
