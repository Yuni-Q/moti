// import Axios from 'axios';
import { NextPage } from 'next';
// import Link from 'next/link';
import React from 'react';
import Error from '../../components/Error';

import normal from '../../static/assets/images/normal.png';
import Onboard from '../../components/Onboard';

interface Props {
	data: number;
}

const Main: NextPage<Props> = () => {
	if (true) {
		return <Onboard />;
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
						<div key={num}>
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

export default Main;
