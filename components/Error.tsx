import React from 'react';
import { useRouter } from 'next/router';
import InternetPng from '../static/assets/images/internet.png';
import unknownError from '../static/assets/images/unknownError.png';

interface Props {
	errorMessage?: string;
}

const Error: React.FC<Props> = ({ errorMessage }) => {
	const router = useRouter();

	return (
		<div
			style={{
				flex: 1,
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<div>
				<img
					src={errorMessage ? unknownError : InternetPng}
					style={errorMessage ? { width: 178, height: 178 } : { width: 114, height: 114 }}
					alt="error"
				/>
			</div>
			<div>
				<div
					style={{
						margin: errorMessage ? '26px 0 32px 0' : '16px 0 32px 0',
						color: '#f1dbcd',
						fontSize: 14,
						textAlign: 'center',
					}}
				>
					{errorMessage ? (
						'알 수 없는 오류가 발생했습니다.'
					) : (
						<>
							인터넷이 불안정해요.
							<br />
							확인 후 재접속 해주세요.
						</>
					)}
				</div>
			</div>
			<button
				type="button"
				style={{
					width: 112,
					height: 40,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 20,
					backgroundColor: '#fff',
					color: 'rgb(212, 161, 125)',
					boxShadow: '0 0 10px 0 rgb(252, 222, 227)',
				}}
				onClick={() => router.reload()}
			>
				재접속
			</button>
		</div>
	);
};

export default Error;
