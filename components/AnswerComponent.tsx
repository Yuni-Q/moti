import React from 'react';
import Answer from '../models/Answer';
import Parts from './Parts';
import { StyledBody, StyledCardFrame, StyledCardFrameWrapper } from './StyledComponent';

interface Props {
	answers: Answer[];
	onChangeAnswers: (answers: Answer[]) => void
}

const AnswerComponent: React.FC<Props> = ({ answers, onChangeAnswers }) => {
	const onClick = () => onChangeAnswers(answers);
	return (
		<StyledBody className="justify-content-center">
			<button type="button" onClick={onClick}>
			<StyledCardFrameWrapper>
				<StyledCardFrame src="/static/assets/images/imgCardframe.png" alt="imgCardframe" />
				<Parts answers={answers} />
				</StyledCardFrameWrapper>
			</button>
		</StyledBody>
	);
};

export default AnswerComponent;
