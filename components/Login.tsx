import { useRouter } from 'next/router';
import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import styled from 'styled-components';
import Signin from '../models/Signin';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { StyeldWrapper, StyledImg } from './StyledComponent';

const StyledAppleLoginButton = styled.button`
	background-color: #fff;
	width: 260px;
	height: 44px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	margin: 24px 0 0;
	
	& > img {
		width: 22px;
		height: 22px;
		background-color: #fff;
	}

	& > div {
		font-size: 14px;
		background-color: #fff;
	}
`;

const Login: React.FC = () => {
	return (
		<StyeldWrapper>
			<StyledImg
				src="/static/assets/images/motiLogo.png"
				alt="motiLogo"
				width="50%"
				className="mt-26"
			/>
			<div className="d-flex flex-column align-items-center">
				<GoogleLoginComponent />
				<div className='mt-6'>
					By creating an account you are agreeing to
				</div>
				<a className='mt-2' href="https://www.notion.so/MOTI-35d01dd331bb4aa0915c33d28d60b63c" target="_blank" rel="noreferrer">
					MOTI&apos;s User Agreement
				</a>
			</div>
			<div className="h6 my-6 text-center">
				Make Own True Identity
			</div>
		</StyeldWrapper>
	);
};

export default Login;

const GoogleLoginComponent = () => {
	const router = useRouter();

	const render = (renderProps: {
		onClick: () => void;
		disabled?: boolean | undefined;
	}) => (
		<StyledAppleLoginButton
			type="button"
			onClick={renderProps.onClick}
			disabled={renderProps.disabled}
		>
			<img src="static/assets/images/icApple.png" alt="icApple" />
			<div>Sign in with google</div>
		</StyledAppleLoginButton>
	)

	const onSuccess = async (result: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		try {
			const { accessToken } = result as GoogleLoginResponse;
			const body = { snsType: 'google' };
			const { accessToken: token, signUp } = await Signin.postSignin({accessToken, body});
			if(token) {
				Cookie.setToken({token});
			}
			
			if(!signUp) {
				return router.push('/signUp');
			}
		} catch(error) {
			consoleError('error', error);
		} finally {
			router.reload();
		}
	}

	const onFailure = (error: unknown) => consoleError('sns Login Faulure', error);

	return (
		<GoogleLogin
			clientId="507319569465-nrfi50380ihnc22f4fsk13cii6e90pff.apps.googleusercontent.com"
			render={render}
			buttonText="Login"
			onSuccess={onSuccess}
			onFailure={onFailure}
			cookiePolicy="single_host_origin"
		/>
	)
}