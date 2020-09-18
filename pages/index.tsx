import React from 'react';
import Main from '../components/Main';
import Answer from '../models/Answer';
import User from '../models/User';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { redirectLogin } from '../utils/redirect';
import { PageContext } from './_app';

interface Props {
	isOnboard: boolean;
	answers: Answer[];
	isTodayAnswer: boolean;
}

const App: React.FC<Props> = ({ isOnboard, answers, isTodayAnswer }) => {	
	return (
		<Main
			isOnboard={isOnboard}
			answers={answers}
			isTodayAnswer={isTodayAnswer}
		/>
	);
};

interface ServerSideProps {
	props: {
		answers: Answer[],
		isTodayAnswer: boolean,
		isOnboard: boolean,
	}
}

export const getServerSideProps = async ({req, res}: PageContext): Promise<ServerSideProps | void> => {
	const props = {
		answers: [] as Answer[],
		isTodayAnswer: false,
		isOnboard: false,
	};
	try {
		const token = await Cookie.getToken(req);
		if(!token) {
            return { props };
		}

		props.isOnboard = !!Cookie.getOnboard(req);
		
		const user = await User.getUsersMy({token})
		if(!user.id) {
            return redirectLogin(res);
		}
		
		const {today, answers} = await Answer.getAnswersWeek({token})
		props.answers = answers;

		const isTodayAnswer = answers.filter((answer) => {
			return answer.date === today;
		}).length > 0;
		props.isTodayAnswer = isTodayAnswer;

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
