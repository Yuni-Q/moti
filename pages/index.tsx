import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
import Login from '../components/Login';
import Main from '../components/Main';

interface Props {
	user: any;
}

const App: React.FC<Props> = ({ user }) => {
	if (!user) {
		return <Login />;
	}
	return (
		<div style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'space-between' }}>
			<Main />
		</div>
	);
};

export const getServerSideProps = async (context: any) => {
	try {
		const cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
		if (!cookies.get('token')) {
			return {
				props: { user: null },
			};
		}
		const token = cookies.get('token');
		const result = await axios.get('https://moti.company/api/v1/users/my', {
			headers: { Authorization: token },
		});
		const user = result.data.data;
		return {
			props: { user },
		};
	} catch (error) {
		console.log(error.message);
		return {
			props: { user: null },
		};
	}
};

export default App;
