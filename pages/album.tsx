import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AnswerDetail from '../components/AnswerDetail';
import Header from '../components/Header';
import { StyeldWrapper } from '../components/StyledComponent';
import Answer from '../models/Answer';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import imgCardframe from '../static/assets/images/imgCardframe.png';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { redirectRoot } from '../utils/redirect';
import { PageContext } from './_app';

const StyleTitle = styled.div`
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

interface Props {
	initCardList: Answer[][];
}

const Album: React.FC<Props> = ({ initCardList }) => {
	const [cardList, setAnswerList] = useState(initCardList || [[]]);
	const [answers, setAnswers] = useState([] as Answer[]);
	const router = useRouter();

	useEffect(() => {
		const checkPoint = window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300;
		const getItem = async () => {
			if (checkPoint) {
				try {
					const lastAnswerNo = cardList[cardList.length - 1][0]?.no;
					if (!!lastAnswerNo && lastAnswerNo !== 1) {
						const token = Cookie.getToken();
						if(!token) {
							return redirectRoot();
						}
						const { id } = cardList[cardList.length - 1][cardList[cardList.length - 1].length - 1];
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
	}, [cardList]);

	const onChangeAnswers = (newAnswers: Answer[]) => {
		setAnswers(newAnswers);
	}

	if (answers.length > 0) {
		return <AnswerDetail answers={answers} onChangeAnswers={onChangeAnswers} />;
	}
	return (
		<StyeldWrapper>
			<Header left={{}}  title="앨범" />
			<div style={{ display: 'flex', height: 72, alignItems: 'center', position: 'relative', flexShrink: 0 }}>
				<button type="button" onClick={() => router.push('/')}>
					<img
						style={{ position: 'absolute', margin: '0 12px', top: 24 }}
						width={24}
						height={24}
						src={icArrowLeft}
						alt="icArrowLeft"
					/>
				</button>
				<div style={{ flex: 1, color: 'rgb(241, 219, 205)', textAlign: 'center' }}>앨범</div>
			</div>
			{/* <div style={{ display: 'flex', margin: '24px 24px 16px', justifyContent: 'center' }} /> */}
			<div style={{ margin: '16px 0 0' }}>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{cardList.map((answer: any) => {
						return (
							<button
								type="button"
								onClick={() => {
									setAnswers(answer);
								}}
								key={answer[0].no}
								style={{ width: '34%', flexShrink: 0, flexGrow: 1, textAlign: 'center', margin: '0 0 32px' }}
							>
								<StyleTitle>No. {answer[0].no}</StyleTitle>
								<button
									type="button"
									// onClick={() => setIsDetail(true)}
									style={{
										width: '80%',
										boxShadow: '0 0 10px 0 rgb(231, 188, 158)',
										borderRadius: 11,
										position: 'relative',
										// display: 'flex',
										flexDirection: 'column',
									}}
								>
									<img src={imgCardframe} width="85%" alt="imgCardframe" style={{ margin: 12 }} />
									{answer.map((value: any) => {
										return (
											<img
												key={value.id}
												width="70%"
												src={value.file.cardPngUrl}
												alt="cardImg"
												style={{ background: 'initial', zIndex: 100, position: 'absolute', top: '10%', left: '15%' }}
											/>
										);
									})}
								</button>
							</button>
						);
					})}
				</div>
			</div>
		</StyeldWrapper>
	);
};

interface ServerSideProps {
	props: {
		initCardList: Answer[][];
	}
}

export const getServerSideProps = async ({req, res}: PageContext): Promise<void | ServerSideProps> => {
	const props = {
		initCardList: [] as Answer[][],
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
		props.initCardList = cardList;

		return {
			props,
		};
	} catch (error) {
		consoleError('error', error);
		return redirectRoot(res);
	}
};

export default Album;
