import { useRouter } from 'next/router';
import React from 'react';
import { StyledBody, StyledCardFrameWrapper, StyledImg } from './StyledComponent';

const Motivation: React.FC = () => {
	const router = useRouter();

	return (
		<StyledBody className="justify-content-center">
			<button
				type="button"
				onClick={() => router.push('/question')}
			>
				<StyledCardFrameWrapper>
					<div className="mt-8">Motivation</div>
					<StyledImg className="mt-8" src="/assets/images/imgQuestion.png" width="202" height="202" alt="imgQuestion" />
					<div className="text-align-center my-8">
						<div>
							Today’s
						</div>
						<div className="mt-2">
							your
						</div>
						<div className="mt-2">
							Question
						</div>
					</div>
				</StyledCardFrameWrapper>
			</button>
		</StyledBody>
	);
};

export default Motivation;
