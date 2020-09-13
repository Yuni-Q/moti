import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import AnswerDetail from '../components/AnswerDetail';
import Header from '../components/Header';
import { StyeldWrapper, StyledCardFrameWrapper, StyledCardFrame, StyledPart } from '../components/StyledComponent';
import Answer from '../models/Answer';
import imgCardframe from '../static/assets/images/imgCardframe.png';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { redirectRoot } from '../utils/redirect';
import { PageContext } from './_app';


const StyledAlbum = styled(StyeldWrapper)`
	justify-content: flex-start;
`;

const StyledCardsWrapper = styled.div`
	margin: 16px 12px 0;
	display: flex;
	flex-wrap: wrap;
`;

const StyledCardWrapperButton = styled.button`
	width: 34%;
	flex-shrink: 0;
	flex-grow: 1;
	text-align: center;
	margin: 0 16px 32px;
`;

const StyledNo = styled.div`
	display: flex;
	flex-basis: 100%;
	align-items: center;
	color: rgb(241, 219, 205);
	font-size: 12px;
	margin: 0 0 16px;

	&::before,
	&::after {
		content: '';
		flex-grow: 1;
		background: rgb(241, 219, 205);
		height: 1px;
		font-size: 0px;
		line-height: 0px;
		margin: 0px 16px;
	}
`;

const StyledAlbumCardFrameWrapper = styled(StyledCardFrameWrapper)`
	width: 100%;
`;

interface Props {
	initCards: Answer[][];
}

const Album: React.FC<Props> = ({ initCards }) => {
	const [cards, setAnswerList] = useState([...initCards, ...initCards] || [[]]);
	const [answers, setAnswers] = useState([] as Answer[]);

	useEffect(() => {
		const checkPoint = window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300;
		const getItem = async () => {
			if (checkPoint) {
				try {
					const lastAnswerNo = cards[cards.length - 1][0]?.no;
					if (!!lastAnswerNo && lastAnswerNo !== 1) {
						const token = Cookie.getToken();
						if(!token) {
							return redirectRoot();
						}
						const { id } = cards[cards.length - 1][cards[cards.length - 1].length - 1];
						if(id) {
							const newCardList = await Answer.getAnswersList({id, token})
							setAnswerList((oldCardList: Answer[][]) => [...oldCardList, ...newCardList]);
						}
						
					}
				} catch (error) {
					consoleError('error', error);
				}
			}
		};
		const fn = _.throttle(getItem, 5000);
		const noScroll = document.documentElement.clientHeight === document.documentElement.scrollHeight;
		if (noScroll) {
			fn();
		}
		window.addEventListener('scroll', fn);
		return () => {
			window.removeEventListener('scroll', fn);
		};
	}, [cards]);

	const onChangeAnswers = (newAnswers: Answer[]) => {
		setAnswers(newAnswers);
	}

	if (answers.length > 0) {
		return <AnswerDetail answers={answers} onChangeAnswers={onChangeAnswers} />;
	}
	return (
		<StyledAlbum>
			<Header left={{}}  title="앨범" />
			<StyledCardsWrapper>
				{cards.map((answer) => {
					return (
						<StyledCardWrapperButton
							key={answer[0].no}
							type="button"
							onClick={() => {
								setAnswers(answer);
							}}
						>
							<StyledNo>No. {answer[0].no}</StyledNo>
							<StyledAlbumCardFrameWrapper>
								<StyledCardFrame src={imgCardframe} alt="imgCardframe" />
								{answer.map((value, index) => {
									return (
										<StyledPart
											key={value.id}
											src={value?.file?.cardPngUrl}
											alt={`cardImg${index}`}
										/>
									);
								})}
							</StyledAlbumCardFrameWrapper>
						</StyledCardWrapperButton>
					);
				})}
			</StyledCardsWrapper>
		</StyledAlbum>
	);
};

interface ServerSideProps {
	props: {
		initCards: Answer[][];
	}
}

export const getServerSideProps = async ({req, res}: PageContext): Promise<void | ServerSideProps> => {
	const props = {
		initCards: [] as Answer[][],
	};
	try {
		const token = Cookie.getToken(req);
		if(!token) {
            return redirectRoot(res);
		}
		
		// const isUser = await checkUser({token});
		// if(!isUser) {
		// 	return redirectRoot(res);
		// }

		const cardList = await Answer.getAnswersList({token})
		props.initCards = cardList;

		return {
			props,
		};
	} catch (error) {
		consoleError('error', error);
		return redirectRoot(res);
	}
};

export default Album;
