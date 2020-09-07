import { NextPage } from 'next';
import Cookies from 'universal-cookie';

import React, { useState } from 'react';
import moment from 'moment';
import Error from './Error';

import normal from '../static/assets/images/normal.png';
import icProfileToucharea from '../static/assets/images/icProfileToucharea.png';
import Onboard from './Onboard';

interface Props {
	isOnboard?: boolean;
}

const Main: NextPage<Props> = ({ isOnboard }) => {
	console.log('on', isOnboard);
	const [step, setStep] = useState(1);
	const [errorMessage, setErrorMessage] = useState('5555');

	if (!isOnboard && step <= 4) {
		return <Onboard step={step} setStep={setStep} />;
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
				{[1, 2, 3, 4, 5, 6].map((num) => {
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
									backgroundColor: '#d4a17d',
									marginTop: 8,
								}}
							/>
						</div>
					);
				})}
			</div>
			{errorMessage && <Error errorMessage={errorMessage} />}
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					width: '100%',
					height: 60,
				}}
			>
				<div>
					<img src={normal} style={{ width: 24, height: 24 }} alt="normal" />
				</div>
				<div>
					<span style={{ color: '#d4a17d', fontSize: 20 }}>{moment().format('YYYY. MM. DD')}</span>
				</div>
				<div>
					<img src={icProfileToucharea} style={{ width: 24, height: 24 }} alt="icProfileToucharea" />
				</div>
			</div>
		</div>
	);
};

export default Main;
