import moment from 'moment';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Answer from '../models/Answer';
import Mission from '../models/Mission';
import AnswerComponent from './AnswerComponent';
import Error from './Error';
import Motivation from './Motivation';
import Onboard from './Onboard';
import Question from './Question';
import { StyledDotButton, StyledDotWrapper, StyledFooter, StyledImg, StyledWrapper } from './StyledComponent';

interface Props {
	isOnboard?: boolean;
	answers: Answer[];
	missions: Mission[];
	cnaRefresh: boolean;
	isTodayAnswer: boolean;

	onChangeAnswers: (answers: Answer[]) => void;
	onChangeMission: (missions: Mission[]) => void;
	onChangeCanRefresh: (cnaRefresh: boolean) => void;
}

const Main: NextPage<Props> = ({ isOnboard, answers, missions, cnaRefresh, isTodayAnswer, onChangeAnswers, onChangeMission, onChangeCanRefresh }) => {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [isQuestion, setIsQuestion] = useState(false);
	const [errorMessage] = useState('');

	const onChageStep = (newStep: number) => {
		setStep(newStep)
	}

	const onChageIsQuestion = (bol: boolean) => {
		setIsQuestion(bol);
	}

	const onClickFooterLeftButton = () => router.push('/album')
	const onClickFooterRightButton = () => router.push('/my')

	if (!isOnboard && step <= 4) {
		return <Onboard step={step} onChageStep={onChageStep} />;
	}
	if (isQuestion) {
		return <Question onChageIsQuestion={onChageIsQuestion} missions={missions} cnaRefresh={cnaRefresh} onChangeMission={onChangeMission}
		onChangeCanRefresh={onChangeCanRefresh}/>;
	}

	return (
		<StyledWrapper>
			<MainDot answers={answers} />
			{errorMessage && <Error errorMessage={errorMessage} />}
			{!errorMessage && !isQuestion && !isTodayAnswer && <Motivation onChageIsQuestion={onChageIsQuestion} />}
			{!!isTodayAnswer && <AnswerComponent answers={answers} onChangeAnswers={onChangeAnswers} />}
			<StyledFooter>
				<div>
					<button type="button" onClick={onClickFooterLeftButton}>
						<StyledImg src="/static/assets/images/normal.png" width="24" height="24" alt="normal" />
					</button>
				</div>
				<div className="h3">
					<span>{moment().format('YYYY. MM. DD')}</span>
				</div>
				<div>
					<button type="button" onClick={onClickFooterRightButton}>
						<StyledImg src="/static/assets/images/icProfileToucharea.png" width="24" height="24" alt="icProfileToucharea" />
					</button>
				</div>
			</StyledFooter>
		</StyledWrapper>
	);
};

export default Main;

interface MainDotProps {
	answers: Answer[];
}

const MainDot: React.FC<MainDotProps> = ({answers}) => {
	return (
		<StyledDotWrapper>
			{[1, 2, 3, 4, 5, 6].map((num, index) => {
				return (
					<div className="my-4 mx-4">
						<div className="text-center">{num}th</div>
						<StyledDotButton
							key={num}
							active={!!answers[index]}
						/>
					</div>
				);
			})}
		</StyledDotWrapper>
	)
}