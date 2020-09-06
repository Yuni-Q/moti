import React from 'react';
import motiLogo from '../static/assets/images/motiLogo.png';
import icApple from '../static/assets/images/icApple.png';

const config = {
	clientId: '507319569465-14q3dk7kdjuedhahq8adjb4l8ifbsvt8.apps.googleusercontent.com',
};

interface Props {
	setToken: (token: string) => void;
}

const Login: React.FC<any> = () => {
	const login = async () => {
		try {
			// const googleData = await Google.logInAsync({
			//  clientId: config.clientId,
			//  scopes: ['profile', 'email'],
			// });
			// if (googleData.type === 'success') {
			//  /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
			//  const result = await axios.post(
			//    'https://moti.company/api/v1/signin',
			//    { snsType: 'google' },
			//    {
			//      headers: { Authorization: googleData.accessToken },
			//    },
			//  );
			//  const token = result.data.data.accessToken;
			//  await AsyncStorage.setItem('token', token).then(() => setToken(token));
			// }
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<button
			type="button"
			style={{ display: 'flex', alignItems: 'center', width: '100vw', height: '100vh', flexDirection: 'column' }}
		>
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
			<button
				type="button"
				style={{ position: 'absolute', bottom: 100, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
			>
				<button
					type="button"
					onClick={() => {
						login();
					}}
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
				<div style={{ marginTop: 24, color: '#d4a17d', backgroundClip: '#fff' }}>
					By creating an account you are agreeing to
				</div>
				<a href="https://www.notion.so/MOTI-35d01dd331bb4aa0915c33d28d60b63c" target="_blank" rel="noreferrer">
					<div style={{ marginTop: 8, color: '#d4a17d', textDecorationLine: 'underline' }}>
						MOTI&apos;s User Agreement
					</div>
				</a>
			</button>
		</button>
	);
};

export default Login;
