import { useRouter } from 'next/router';
import React from 'react';
import imgMypage from '../static/assets/images/imgMypage.png';

const Submit: React.FC = () => {
	const router = useRouter();

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<div
				style={{
					display: 'flex',
					height: 72,
					alignItems: 'center',
					position: 'relative',
					width: '100vw',
					flexShrink: 0,
				}}
			>
				<div style={{ flex: 1, color: 'rgb(241, 219, 205)', textAlign: 'center' }}>미션 완료</div>
			</div>
			<div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
				<div style={{ margin: '52px 0 0', fontSize: 24 }}>
					오늘의 질문에 답변을
					<br />
					완료했습닌다.
				</div>
				<div style={{ margin: '12px 0 0' }}>새로운 파츠를 얻었어요. 확인해볼까요?</div>
				<div style={{ margin: '28px 0 0' }}>
					<img width="108" height="108" src={imgMypage} alt="imgMypage" />
				</div>
			</div>
			<div>
				<button
					type="button"
					style={{
						margin: '0 0 148px 0',
						width: 168,
						height: 40,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 20,
						backgroundColor: '#fff',
						color: 'rgb(212, 161, 125)',
						boxShadow: '0 0 10px 0 rgb(252, 222, 227)',
					}}
					onClick={() => router.push('/')}
				>
					확인하러 가기
				</button>
			</div>
		</div>
	);
};

export default Submit;
