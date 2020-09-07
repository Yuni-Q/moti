import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import { consoleError } from '../utils/log';

interface Props {
	user: any;
	isOnboard: boolean;
}

const SignUp: React.FC<Props> = () => {
	const [step, setStep] = useState(0);
	const [nickName, setNickName] = useState('');

	const onSubmit = () => {
		console.log('onSubmit');
	};
	return (
		<form onSubmit={onSubmit}>
			{step === 0 && (
				<div
					style={{
						width: '100vw',
						height: '100vh',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'column',
					}}
				>
					<div style={{ display: 'flex', height: 72, alignItems: 'center' }}>
						<img width={24} height={24} src={icArrowLeft} alt="icArrowLeft" />
						<div style={{ flex: 1, color: 'rgb(241, 219, 205)', textAlign: 'center' }}>닉네임 설정</div>
					</div>
					<div style={{ textAlign: 'center' }}>
						<input
							value={nickName}
							onChange={(e) => setNickName(e.target.value)}
							style={{ fontSize: 24, textAlign: 'center', border: 'none', borderBottom: '1px solid rgb(163, 118, 87)' }}
							maxLength={8}
							placeholder="8글자로 만들어주세요"
						/>
					</div>
					<div>8글자로 만들어 주세요</div>
					<div style={{ textAlign: 'center', margin: '0 0 148px 0' }}>
						<button
							type="button"
							style={{
								width: 240,
								height: 40,
								backgroundColor: 'rgb(222, 226, 230)',
								color: 'rgb(173, 181, 189)',
								borderRadius: 30,
							}}
						>
							다 음
						</button>
					</div>
				</div>
			)}
		</form>
	);
};

export const getServerSideProps = async (context: any) => {
	const props = {
		user: null,
		isOnboard: false,
	};
	try {
		const cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
		props.isOnboard = !!cookies.get('onboard');
		if (!cookies.get('token')) {
			return {
				props,
			};
		}
		const token = cookies.get('token');
		const result = await axios.get('https://moti.company/api/v1/users/my', {
			headers: { Authorization: token },
		});
		props.user = result.data.data;
		return {
			props,
		};
	} catch (error) {
		console.log(error.message);
		return {
			props,
		};
	}
};

export default SignUp;
