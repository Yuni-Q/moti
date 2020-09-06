import { NextPage } from 'next';
import Cookies from 'universal-cookie';

import React, { useState } from 'react';
import Error from '../components/Error';

import normal from '../static/assets/images/normal.png';
import Onboard from '../components/Onboard';

interface Props {
	onboard: boolean;
}

const Main: NextPage<Props> = ({ onboard }) => {
	const [step, setStep] = useState(1);

	if (!onboard && step <= 4) {
		return <Onboard step={step} setStep={setStep} />;
	}
	return (
		<>
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
			<Error internet />
			<div
				style={{
					position: 'fixed',
					bottom: 0,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					width: '100%',
					height: 36,
				}}
			>
				<div>
					<img src={normal} style={{ width: 24, height: 24 }} alt="normal" />
				</div>
				<div>
					<span style={{ color: '#d4a17d', fontSize: 20 }}>Nov. 2nd week</span>
				</div>
				<div>
					<img src={normal} style={{ width: 24, height: 24 }} alt="normal" />
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (context: any) => {
	const cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
	console.log('cookie', cookies);
	console.log(cookies.get('_ga')); // Pacman

	// Axios.defaults.headers.Cookie = '';
	// if (context.req && cookie) {
	//	Axios.defaults.headers.Cookie = cookie;
	// }

	return { props: { onboard: !!cookies.get('onboard') } };
};

export default Main;
