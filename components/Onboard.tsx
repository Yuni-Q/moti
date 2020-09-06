import React from 'react';
import Cookies from 'universal-cookie';
import onbording1 from '../static/assets/images/onbording1.png';
import onbording2 from '../static/assets/images/onbording2.png';
import onbording3 from '../static/assets/images/onbording3.png';
import onbording4 from '../static/assets/images/onbording4.png';

const getImage = (step: number) => {
	if (step === 1) {
		return onbording1;
	}
	if (step === 2) {
		return onbording2;
	}
	if (step === 3) {
		return onbording3;
	}
	return onbording4;
};

interface Props {
	step: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Onboard: React.FC<Props> = ({ step, setStep }) => {
	return (
		<button
			type="button"
			onClick={() => {
				if (step >= 4) {
					const cookies = new Cookies();
					cookies.set('onboard', 'true');
				}
				setStep((oldStep) => oldStep + 1);
			}}
		>
			<div
				style={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<div style={{ display: 'flex', flexDirection: 'row', marginTop: 32 }}>
					{[1, 2, 3, 4].map((num) => {
						console.log(123, num);
						return (
							<div
								key={num}
								style={{
									width: 8,
									height: 8,
									borderRadius: 8,
									backgroundColor: num === step ? '#d4a17d' : '#444',
									marginLeft: 16,
									marginRight: 16,
								}}
							/>
						);
					})}
				</div>
				<span
					style={{
						marginTop: 36,
						color: '#d4a17d',
						textAlign: 'center',
						fontSize: 20,
					}}
				>
					매일 나에 대한 새로운 질문
				</span>
				<span
					style={{
						marginTop: 16,
						color: '#d4a17d',
						textAlign: 'center',
						fontSize: 12,
					}}
				>
					하루에 받는 질문 3개 중 마음에 드는 질문을 선택하세요.{'\n'}
					질문은 하루 한번씩 다시 받기 가능합니다.
				</span>
				<img
					src={getImage(step)}
					style={{ width: '100vw', height: 'calc(100vh / 3 * 2)px' }}
					alt="onbording"
					// resizeMode="contain"
				/>
			</div>
		</button>
	);
};

export default Onboard;
