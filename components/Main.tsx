import moment from 'moment';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import icProfileToucharea from '../static/assets/images/icProfileToucharea.png';
import normal from '../static/assets/images/normal.png';
import Answer from './Answer';
import Error from './Error';
import Motivation from './Motivation';
import Onboard from './Onboard';
import Question from './Question';

interface Props {
	isOnboard?: boolean;
	answers: any[];
	missions: any[];
	refresh: boolean;
	check: boolean;

	setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main: NextPage<Props> = ({ isOnboard, answers, missions, refresh, check, setIsDetail }) => {
	console.log('check', check);
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [isQuestion, setIsQuestion] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [cardArray, setCardArray] = useState(answers);

	if (!isOnboard && step <= 4) {
		return <Onboard step={step} setStep={setStep} />;
	}
	if (isQuestion) {
		return <Question setIsQuestion={setIsQuestion} missions={missions} refresh={refresh} />;
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					width: '100%',
				}}
			>
				{[1, 2, 3, 4, 5, 6].map((num, index) => {
					return (
						<div
							key={num}
							style={{
								margin: '16px 0',
							}}
						>
							<span style={{ color: '#d4a17d' }}>{num}th</span>
							<div
								style={{
									width: 16,
									height: 16,
									borderRadius: 16,
									backgroundColor: cardArray[index] ? '#d4a17d' : 'rgb(68, 68, 68)',
									marginTop: 8,
								}}
							/>
						</div>
					);
				})}
			</div>
			{errorMessage && <Error errorMessage={errorMessage} />}
			{!errorMessage && !isQuestion && !check && <Motivation setIsQuestion={setIsQuestion} />}
			{!!check && <Answer cardArray={cardArray} setIsDetail={setIsDetail} />}
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					width: '100%',
					height: 60,
					flexShrink: 0,
					alignItems: 'center',
				}}
			>
				<div>
					<button type="button" onClick={() => router.push('/my')}>
						<img src={normal} style={{ width: 24, height: 24 }} alt="normal" />
					</button>
				</div>
				<div>
					<span style={{ color: '#d4a17d', fontSize: 20 }}>{moment().format('YYYY. MM. DD')}</span>
				</div>
				<div>
					<button type="button" onClick={() => router.push('/my')}>
						<img src={icProfileToucharea} style={{ width: 24, height: 24 }} alt="icProfileToucharea" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Main;
