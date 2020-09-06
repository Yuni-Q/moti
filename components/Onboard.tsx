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

const getTitle = (step: number) => {
	if (step === 1) {
		return '매일 나에 대한 새로운 질문';
	}
	if (step === 2) {
		return '나를 기록하기';
	}
	if (step === 3) {
		return '나만의 드림캐쳐 만들기';
	}
	return '리마인더';
};

const getText = (step: number) => {
	if (step === 1) {
		return (
			<>
				하루에 받는 질문 3개 중 마음에 드는 질문을 선택하세요.
				<br />
				질문은 하루 한번씩 다시 받기 가능합니다.
			</>
		);
	}
	if (step === 2) {
		return (
			<>
				사진, 글 등으로 답할 수 있는 질문에 대답하며
				<br />
				나를 기록하는 시간을 가져보세요.
			</>
		);
	}
	if (step === 3) {
		return (
			<>
				질문에 답변해 파츠를 하나씩 모으세요.
				<br />
				6일간의 기록을 통해 나만의 드림캐쳐가 완성됩니다.
			</>
		);
	}
	return (
		<>
			앨범에서 지금까지 모은 드림캐쳐와
			<br />
			기록을 다시 확인할 수 있어요.{' '}
		</>
	);
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
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							height: 72,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{[1, 2, 3, 4].map((num) => {
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
					<div
						style={{
							color: '#d4a17d',
							textAlign: 'center',
							fontSize: 20,
						}}
					>
						{getTitle(step)}
					</div>
					<div
						style={{
							marginTop: 16,
							color: '#d4a17d',
							textAlign: 'center',
							fontSize: 12,
						}}
					>
						{getText(step)}
					</div>
				</div>
				<img src={getImage(step)} style={{ width: '100vw', height: 'calc(100vh / 3 * 2)px' }} alt="onbording" />
			</div>
		</button>
	);
};

export default Onboard;
