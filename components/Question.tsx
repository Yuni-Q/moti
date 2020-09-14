import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Mission from '../models/Mission';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import Header from './Header';
import { StyeldForm, StyledBottomButton, StyledCarousel, StyledDotButton, StyledDotWrapper } from './StyledComponent';

const StyledQuestionWrapper = styled.div`
	margin: 16px 0 24px;
	flex-shrink: 0;
	box-shadow: 0 0 10px 0 rgb(231, 188, 158);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border-radius: 11px;
	height: 90%;
`;

const StyledQuestionHeader = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	padding: 16px;
	border-radius: 11px;
	img + img {
		margin: 0 0 0 8px;
	}
`;


interface Props {
	missions: Mission[];
	cnaRefresh: boolean;
	onChageIsQuestion: (bol: boolean) => void;
	onChangeMission: (onChangeMission: Mission[]) => void;
	onChangeCanRefresh: (onChangeCanRefresh: boolean) => void;
}

const Question: React.FC<Props> = ({ missions, cnaRefresh, onChageIsQuestion, onChangeMission, onChangeCanRefresh }) => {
	const router = useRouter();
	const [slideIndex, setSlideIndex] = useState(0);
	
	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (cnaRefresh) {
			try {
				const token = Cookie.getToken();
				const { missions: newMissions, refresh } = await Mission.getMissionsRefresh({token});
				onChangeCanRefresh(refresh);
				onChangeMission(newMissions);
			} catch (error) {
				consoleError('error', error);
			}
		}
	}

	const onClickAnswrButton = (id?: number) => {
		if(id) {
			router.push(`missions/${id}`);
		}
	};

	const onClickLeftButton = () => onChageIsQuestion(false);

	const onChangeSlideIndex = (newSlideIndex: number) => {
		setSlideIndex(newSlideIndex)
	}

	const defaultControlsConfig = {
		nextButtonStyle: { display: 'none' },
		prevButtonStyle: { display: 'none' },
	}
	
	return (
		<StyeldForm onSubmit={onSubmit}>
			<Header left={{onClick: onClickLeftButton}} title="질문 선택" />
			<StyledCarousel
				height="100%"
				cellAlign="center"
				slidesToShow={1}
				slideWidth={0.8}
				cellSpacing={24}
				autoplay={false}
				defaultControlsConfig={defaultControlsConfig}
				slideIndex={slideIndex}
				afterSlide={onChangeSlideIndex}
			>
				{missions.map((mission, index) => {
					return (
						<StyledQuestionWrapper key={mission.id}>
							<StyledQuestionHeader>
								{mission.isImage && <img width="24" height="24" src="/static/assets/images/icCameraNormal.png" alt="icCameraNormal" />}
								{mission.isContent && <img width="24" height="24" src="/static/assets/images/icTextformNormal.png" alt="icTextformNormal" />}
							</StyledQuestionHeader>
							<div className="m-4">
								<div>질문 {index + 1}</div>
								<div className="h3 mt-4">{mission.title}</div>
							</div>
							<StyledBottomButton
								className="text-center mb-8"
								width={240}
								type="button"
								onClick={() => onClickAnswrButton(mission.id)}
							>
								답변하기
							</StyledBottomButton>
						</StyledQuestionWrapper>
					);
				})}
			</StyledCarousel>
			<QuestionDot onChangeSlideIndex={onChangeSlideIndex} />
			<StyledBottomButton width={201} type="submit">
				질문 다시받기 {cnaRefresh ? '1' : '0'} / 1
			</StyledBottomButton>
		</StyeldForm>
	);
};

interface QuestionDotProps {
	slideIndex: number;
	onChangeSlideIndex: (slideIndex: number) => void;

}

const QuestionDot: React.FC<QuestionDotProps> = ({slideIndex, onChangeSlideIndex}) => {
	return (
		<StyledDotWrapper>
			{[0, 1, 2].map((num) => {
				return (
					<StyledDotButton
						key={num}
						active={num === slideIndex}
						onClick={() => onChangeSlideIndex(num)}
					>
						dot
					</StyledDotButton>
				);
			})}
		</StyledDotWrapper>
	)
}

export default Question;
