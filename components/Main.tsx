import dayjs from 'dayjs';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Answer from '../models/Answer';
import AnswerComponent from './AnswerComponent';
import Error from './Error';
import Motivation from './Motivation';
import Onboard from './Onboard';
import { StyledDotButton, StyledDotWrapper, StyledFooter, StyledImg, StyledWrapper } from './StyledComponent';

interface Props {
	isOnboard?: boolean;
	answers: Answer[];
	isTodayAnswer: boolean;
}

const Main: NextPage<Props> = ({ isOnboard, answers, isTodayAnswer }) => {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [errorMessage] = useState('');

	const onChageStep = (newStep: number) => {
		setStep(newStep)
	}

	const onClickFooterLeftButton = () => router.push('/album')
	const onClickFooterRightButton = () => router.push('/my')

	if (!isOnboard && step <= 4) {
		return <Onboard step={step} onChageStep={onChageStep} />;
	}
	
	return (
		<StyledWrapper>
			<MainDot answers={answers} />
			{errorMessage && <Error errorMessage={errorMessage} />}
			{!errorMessage && !isTodayAnswer && <Motivation />}
			{!!isTodayAnswer && <AnswerComponent answers={answers} />}
			<StyledFooter>
				<div>
					<button type="button" onClick={onClickFooterLeftButton}>
						<StyledImg src="/static/assets/images/normal.png" width="24" height="24" alt="normal" />
					</button>
				</div>
				<div className="h3">
					<span>{dayjs().format('YYYY. MM. DD')}</span>
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
					<div className="my-4 mx-4" key={num}>
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