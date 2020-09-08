import React from 'react';
import { useRouter } from 'next/router';
import imgQuestion from '../static/assets/images/imgQuestion.png';

interface Props {
	setIsQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}

const Motivation: React.FC<Props> = ({ setIsQuestion }) => {
	const router = useRouter();

	return (
		<div
			style={{
				flex: 1,
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
				margin: '24px 0',
			}}
		>
			<button
				type="button"
				onClick={() => setIsQuestion(true)}
				style={{
					width: 257,
					height: 416,
					boxShadow: '0 0 10px 0 rgb(231, 188, 158)',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 11,
				}}
			>
				<div style={{ margin: '32px 0 0 0' }}>Motivation</div>
				<img src={imgQuestion} width="202" height="202" style={{ margin: '36px 0 0 0' }} alt="imgQuestion" />
				<div style={{ textAlign: 'center', margin: '36px 0 0 0' }}>
					Today’s
					<br />
					your
					<br />
					Question
				</div>
			</button>
		</div>
	);
};

export default Motivation;
