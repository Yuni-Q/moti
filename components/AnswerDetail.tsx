import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Answer from '../models/Answer';
import icRewriteNormal from '../static/assets/images/icRewriteNormal.png';
import ContentComponent from './ContentComponent';
import Header from './Header';
import { StyledCardFrame, StyledCardFrameWrapper, StyledCarousel, StyledDotButton, StyledDotWrapper, StyledRightIcon, StyledSubTitle, StyledWrapper } from './StyledComponent';

interface Props {
	answers: Answer[];
	onChangeAnswers: (answers: Answer[]) => void;
}

const AnswerDetail: React.FC<Props> = ({ answers, onChangeAnswers }) => {
	const router = useRouter();
	const [slideIndex, setSlideIndex] = useState(0);
	const title = dayjs(answers[slideIndex].date).format('YYYY. MM. DD');

	const onChagneSlideIndex = (newIndex: number) => {
		setSlideIndex(newIndex);
	}
	return (
		<StyledWrapper>
			<Header left={{onClick: () => onChangeAnswers([])}}  title={title} right={{onClick: () => router.push('/album'), imgUrl: '/static/assets/images/normal.png', alt: 'normal'}} />
			<AnswerDetailDot answers={answers} slideIndex={slideIndex} onChagneSlideIndex={onChagneSlideIndex} />
			<AnswerCarosel answers={answers} slideIndex={slideIndex} onChagneSlideIndex={onChagneSlideIndex} />
		</StyledWrapper>
	);
};

const StyledCardsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	overflow: scroll;
`;

interface AnswerDetailDotProps {
	answers: Answer[];
	slideIndex: number;
	onChagneSlideIndex: (index:number) => void;
}

const AnswerDetailDot:React.FC<AnswerDetailDotProps> = ({answers, slideIndex, onChagneSlideIndex}) => {
	return (
		<StyledDotWrapper>
			{answers.map((_, index) => {
				return (
					<StyledDotButton
						active={index === slideIndex}
						type="button"
						onClick={() => onChagneSlideIndex(index)}
					>
						dot
					</StyledDotButton>
				);
			})}
		</StyledDotWrapper>
	)
}

interface AnswerCaroselProps {
	answers: Answer[];
	slideIndex: number;
	onChagneSlideIndex: (index: number) => void;
}

export default AnswerDetail;

const AnswerCarosel: React.FC<AnswerCaroselProps> = ({answers, slideIndex, onChagneSlideIndex}) => {
	const router = useRouter();

	const defaultControlsConfig= {
		nextButtonStyle: { display: 'none' },
		prevButtonStyle: { display: 'none' },
	};

	return (
			<StyledCarousel
				cellAlign="center"
				slidesToShow={1}
				cellSpacing={24}
				autoplay={false}
				defaultControlsConfig={defaultControlsConfig}
				slideIndex={slideIndex}
				afterSlide={(newSlideIndex) => onChagneSlideIndex(newSlideIndex)}
			>
				{answers.map((answer) => {
					return (
						<StyledCardsWrapper key={answer.id} >
							<StyledSubTitle className="mx-13">
								<div>{answer?.mission?.title}</div>
								<button type="button" onClick={() => router.push(`/answers/${answer.id}`)}>
									<StyledRightIcon
										className="mr-6"
										width={24}
										height={24}
										src={icRewriteNormal}
										alt="icRewriteNormal"
									/>
								</button>
							</StyledSubTitle>
							<StyledCardFrameWrapper>
								<StyledCardFrame src="/static/assets/images/imgCardframe.png" alt="imgCardframe" />
								<ContentComponent imgSrc={answer.imageUrl || ''}  isContent={answer.mission?.isContent} content={answer.content || ''} />
							</StyledCardFrameWrapper>
						</StyledCardsWrapper>
					);
				})}
			</StyledCarousel>
	)
}
