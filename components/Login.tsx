import React from 'react';
import { StyledImg, StyledWrapper } from './StyledComponent';

// const StyledAppleLoginButton = styled.button`
// 	background-color: #fff;
// 	width: 260px;
// 	height: 44px;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	border-radius: 20px;
// 	margin: 24px 0 0;
	
// 	& > img {
// 		width: 22px;
// 		height: 22px;
// 		background-color: #fff;
// 	}

// 	& > div {
// 		font-size: 14px;
// 		background-color: #fff;
// 	}
// `;

const Login: React.FC = () => {
	return (
		<StyledWrapper>
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
		</StyledWrapper>
	);
};

export default Login;

const GoogleLoginComponent = () => {
	// const render = (renderProps: {
	// 	onClick: () => void;
	// 	disabled?: boolean | undefined;
	// }) => (
	// 	<StyledAppleLoginButton
	// 		type="button"
	// 		onClick={renderProps.onClick}
	// 		disabled={renderProps.disabled}
	// 	>
	// 		<img src="static/assets/images/icApple.png" alt="icApple" />
	// 		<div>Sign in with google</div>
	// 	</StyledAppleLoginButton>
	// )

	// const onSuccess = async (result: GoogleLoginResponse | GoogleLoginResponseOffline) => {
	// 	try {
	// 		const { accessToken } = result as GoogleLoginResponse;
	// 		const body = { snsType: 'google' };
	// 		const { accessToken: token, signUp } = await Signin.postSignin({accessToken, body});
	// 		if(token) {
	// 			Cookie.setToken({token});
	// 		}
			
	// 		if(!signUp) {
	// 			return router.push('/signUp');
	// 		}
	// 	} catch(error) {
	// 		consoleError('error', error);
	// 	} finally {
	// 		router.reload();
	// 	}
	// }

	// const onFailure = (error: unknown) => consoleError('sns Login Faulure', error);

	return (
		<a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/analytics.readonly&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=https://yuni-q.github.io&response_type=code&client_id=507319569465-nrfi50380ihnc22f4fsk13cii6e90pff.apps.googleusercontent.com" >aaaa</a>
		// <GoogleLogin
		// 	clientId="507319569465-nrfi50380ihnc22f4fsk13cii6e90pff.apps.googleusercontent.com"
		// 	render={render}
		// 	buttonText="Login"
		// 	onSuccess={onSuccess}
		// 	onFailure={onFailure}
		// 	cookiePolicy="single_host_origin"
		// />
	)
}