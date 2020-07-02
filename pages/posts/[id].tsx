import React from 'react';
import { useRouter } from 'next/router';

const Post = (): React.ReactNode => {
	const router = useRouter();
	const { id } = router.query;

	return <div>{id}</div>;
};

export default Post;
