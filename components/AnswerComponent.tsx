import { useRouter } from 'next/router';
import React from 'react';
import Answer from '../models/Answer';
import Parts from './Parts';
import { StyledBody, StyledCardFrame, StyledCardFrameWrapper } from './StyledComponent';

interface Props {
	answers: Answer[];
}

const AnswerComponent: React.FC<Props> = ({ answers }) => {
	const router = useRouter();
	const onClick = () => router.push(`/answers/list/${answers[0].id}`);
	return (
		<StyledBody className="justify-content-center">
			<button type="button" onClick={onClick}>
			<StyledCardFrameWrapper>
				<StyledCardFrame src="/assets/images/imgCardframe.png" alt="imgCardframe" />
				<Parts answers={answers} />
				</StyledCardFrameWrapper>
			</button>
		</StyledBody>
	);
};

export default AnswerComponent;
