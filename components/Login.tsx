import React from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import icApple from '../static/assets/images/icApple.png';
import motiLogo from '../static/assets/images/motiLogo.png';

const Login: React.FC = () => {
	const router = useRouter();

	return (
		<div style={{ display: 'flex', alignItems: 'center', width: '100vw', height: '100vh', flexDirection: 'column' }}>
			<img
				src={motiLogo}
				alt="motiLogo"
				style={{ width: 'calc(100vw / 2)', height: 'calc(100vw / 2 / 5)', marginTop: 204 }}
			/>
			<div
				style={{
					color: '#f1dbcd',
					marginTop: 24,
					fontSize: 14,
					textAlign: 'center',
				}}
			>
				Make Own True Identity
			</div>
			<div
				style={{ position: 'absolute', bottom: 100, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
			>
				<GoogleLogin
					clientId="507319569465-nrfi50380ihnc22f4fsk13cii6e90pff.apps.googleusercontent.com"
					render={(renderProps) => (
						<button
							type="button"
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
							style={{
								backgroundColor: '#fff',
								width: 'calc(100vw - 16px - 16px)',
								height: 44,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 20,
								marginTop: 24,
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'row',
									marginRight: 8,
									backgroundColor: '#fff',
								}}
							>
								<img src={icApple} style={{ width: 22, height: 22, backgroundColor: '#fff' }} alt="icApple" />
								<div style={{ fontSize: 14, backgroundColor: '#fff' }}>Sign in with google</div>
							</div>
						</button>
					)}
					buttonText="Login"
					onSuccess={(result) => {
						const { accessToken } = result;
						axios
							.post(
								'https://moti.company/api/v1/signin',
								{ snsType: 'google' },
								{ headers: { Authorization: accessToken } },
							)
							.then((apiResult) => {
								const cookies = new Cookies();
								const token = apiResult.data.data.accessToken;
								cookies.set('token', token);
								router.push('/');
							})
							.catch((error) => {
								console.error('error', error);
								router.reload();
							});
					}}
					onFailure={(result) => console.log(result)}
					cookiePolicy="single_host_origin"
				/>
				<div style={{ marginTop: 24, color: '#d4a17d', backgroundClip: '#fff' }}>
					By creating an account you are agreeing to
				</div>
				<a href="https://www.notion.so/MOTI-35d01dd331bb4aa0915c33d28d60b63c" target="_blank" rel="noreferrer">
					<div style={{ marginTop: 8, color: '#d4a17d', textDecorationLine: 'underline' }}>
						MOTI&apos;s User Agreement
					</div>
				</a>
			</div>
		</div>
	);
};

export default Login;
