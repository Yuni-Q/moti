import React from 'react';
import InternetPng from '../static/assets/images/internet.png';
import unknownError from '../static/assets/images/unknownError.png';

interface Props {
	internet?: boolean;
}

const Error: React.FC<Props> = ({ internet }) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
			<div>
				<img
					src={internet ? InternetPng : unknownError}
					style={internet ? { width: 114, height: 114 } : { width: 178, height: 178 }}
					alt="error"
				/>
			</div>
			<div>
				<span
					style={{
						color: '#f1dbcd',
						marginTop: 16,
						fontSize: 14,
						lineHeight: 26,
						textAlign: 'center',
					}}
				>
					{internet ? '인터넷이 불안정해요.\n확인 후 재접속 해주세요.' : '알 수 없는 오류가 발생했습니다.'}
				</span>
			</div>
			<div
				style={{
					backgroundColor: '#fff',
					width: 112,
					height: 40,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 20,
					marginTop: 32,
				}}
			>
				<span style={{ color: '#d4a17d' }}>재접속</span>
			</div>
		</div>
	);
};

export default Error;
