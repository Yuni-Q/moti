import React from 'react';
import { useRouter } from 'next/router';
import imgCardframe from '../static/assets/images/imgCardframe.png';

interface Props {
	cardArray: any[];
}

const Answer: React.FC<Props> = ({ cardArray }) => {
	const router = useRouter();

	return (
		<div style={{ flex: 1, width: '100vw', display: 'flex', alignItems: 'center' }}>
			<div
				style={{
					margin: '0 auto',
					width: 311,
					height: 482,
					boxShadow: '0 0 10px 0 rgb(231, 188, 158)',
					borderRadius: 11,
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<img src={imgCardframe} width="287" alt="imgCardframe" style={{ margin: 12, position: 'absolute' }} />
				{cardArray.map((value) => {
					return (
						<img
							width="186"
							height="316"
							src={value.file.cardPngUrl}
							alt="cardImg"
							style={{ background: 'initial', zIndex: 100, position: 'absolute', top: 80, left: 62 }}
						/>
					);
				})}
				<div
					style={{
						textAlign: 'center',
						zIndex: 10,
						width: 255,
						margin: '28px auto 32px',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'column',
						flex: 1,
					}}
				/>
			</div>
		</div>
	);
};

export default Answer;
