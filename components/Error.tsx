import React from 'react';
import { useRouter } from 'next/router';
import InternetPng from '../static/assets/images/internet.png';
import unknownError from '../static/assets/images/unknownError.png';

interface Props {
	internet?: boolean;
}

const Error: React.FC<Props> = ({ internet }) => {
	const router = useRouter();

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				height: 'calc(100vh - 75px - 60px)',
				justifyContent: 'center',
			}}
		>
			<div>
				<img
					src={internet ? InternetPng : unknownError}
					style={internet ? { width: 114, height: 114 } : { width: 178, height: 178 }}
					alt="error"
				/>
			</div>
			<div>
				<div
					style={{
						margin: internet ? '16px 0 32px 0' : '26px 0 32px 0',
						color: '#f1dbcd',
						fontSize: 14,
						textAlign: 'center',
					}}
				>
					{internet ? (
						<>
							인터넷이 불안정해요.
							<br />
							확인 후 재접속 해주세요.
						</>
					) : (
						'알 수 없는 오류가 발생했습니다.'
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
