import React from 'react';
import Head from 'next/head';

interface Props {
	children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }: any) => {
	return (
		<>
			<Head>
				<title>yuni-q</title>
			</Head>
			{children}
		</>
	);
};

export default AppLayout;
