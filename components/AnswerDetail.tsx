import moment from 'moment';
import { useRouter } from 'next/router';
import Carousel from 'nuka-carousel';
import React, { useState } from 'react';
import styled from 'styled-components';
import Answer from '../models/Answer';
import icRewriteNormal from '../static/assets/images/icRewriteNormal.png';
import ContentComponent from './ContentComponent';
import Header from './Header';
import { StyeldWrapper, StyledCardFrame, StyledCardFrameWrapper, StyledDotButton, StyledDotWrapper, StyledRightIcon, StyledSubTitle } from './StyledComponent';

const StyledCarousel = styled(Carousel)`
	flex: 1;
	height: 100%;
	.slider-frame {
		ul.slider-list {
			height: 100% !important;
			li.slider-slide {
				height: 100% !important;
			}
		}
	}
	.slider-control-bottomcenter {
		display: none;
	}
`;

interface Props {
	answers: Answer[];
	onChangeAnswers: (answers: Answer[]) => void;
}

const AnswerDetail: React.FC<Props> = ({ answers, onChangeAnswers }) => {
	const router = useRouter();
	const [slideIndex, setSlideIndex] = useState(0);
	const title = moment(answers[slideIndex].date).format('YYYY. MM. DD');

	const onChagneSlideIndex = (newIndex: number) => {
		setSlideIndex(newIndex);
	}
	return (
		<StyeldWrapper>
			<Header left={{onClick: () => onChangeAnswers([])}}  title={title} right={{onClick: () => router.push('/album'), imgUrl: '/static/assets/images/normal.png', alt: 'normal'}} />
			<StyledDotWrapper>
				{answers.map((_, index) => {
					return (
						<StyledDotButton
							active={index === slideIndex}
							type="button"
							onClick={() => setSlideIndex(index)}
						>
							dot
						</StyledDotButton>
					);
				})}
			</StyledDotWrapper>
			<AnswerCarosel answers={answers} slideIndex={slideIndex} onChagneSlideIndex={onChagneSlideIndex} />
		</StyeldWrapper>
	);
};

const StyledCardsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	overflow: scroll;
`;

interface AnswerCaroselProps {
	answers: Answer[];
	slideIndex: number;
	onChagneSlideIndex: (index: number) => void;
}

export default AnswerDetail;

const AnswerCarosel: React.FC<AnswerCaroselProps> = ({answers, slideIndex, onChagneSlideIndex}) => {
	const router = useRouter();
	return (
			<StyledCarousel
				cellAlign="center"
				slidesToShow={1}
				cellSpacing={24}
				autoplay={false}
				defaultControlsConfig={{
					nextButtonStyle: { display: 'none' },
					prevButtonStyle: { display: 'none' },
				}}
				slideIndex={slideIndex}
				afterSlide={(newSlideIndex) => onChagneSlideIndex(newSlideIndex)}
			>
				{answers.map((answer) => {
					return (
						<StyledCardsWrapper key={answer.id} >
							<StyledSubTitle>
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
