import React from 'react';
import imgCardframe from '../static/assets/images/imgCardframe.png';

interface Props {
	cardArray: any[];
	setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const Answer: React.FC<Props> = ({ cardArray, setIsDetail }) => {
	return (
		<div style={{ flex: 1, width: '100vw', display: 'flex', alignItems: 'center', margin: '24px 0' }}>
			<button
				type="button"
				onClick={() => setIsDetail(true)}
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
			</button>
		</div>
	);
};

export default Answer;
