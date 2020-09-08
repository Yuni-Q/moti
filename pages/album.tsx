import axios from 'axios';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import icRewriteNormal from '../static/assets/images/icRewriteNormal.png';
import imgCardframe from '../static/assets/images/imgCardframe.png';
import AnswerDetail from '../components/AnswerDetail';

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
	user: any;
	answers: any;
}

const Album: React.FC<Props> = ({ user, answers }) => {
	const [answerList, setAnswerList] = useState(answers);
	const [detailAnswer, setDetailAnswer] = useState([]);
	const [idDetail, setIsDetail] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const getItem = async () => {
			if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
				try {
					if (answerList[answerList.length - 1][0].no !== 1) {
						const cookies = new Cookies();
						const token = cookies.get('token');
						const newAnswerList = await axios.get(
							`http://localhost:8000/api/v1/answers/list?answerId=${
								answerList[answerList.length - 1][answerList[answerList.length - 1].length - 1].id
							}`,
							{
								headers: { Authorization: token },
							},
						);
						setAnswerList((oldAnswerList: any) => [...oldAnswerList, ...newAnswerList.data.data]);
					}
				} catch (error) {
					console.log('error', error);
				}
			}
		};
		const fn = _.throttle(getItem, 5000);
		if (document.documentElement.clientHeight === document.documentElement.scrollHeight) {
			fn();
		}
		window.addEventListener('scroll', fn);
		return () => {
			window.removeEventListener('scroll', fn);
		};
	}, [answerList]);
	if (idDetail) {
		return <AnswerDetail cardArray={detailAnswer} setIsDetail={setIsDetail} />;
	}
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
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
					{answerList.map((answer: any) => {
						return (
							<button
								type="button"
								onClick={() => {
									setDetailAnswer(answer);
									setIsDetail(true);
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
		</div>
	);
};

export const getServerSideProps = async (context: any) => {
	const props = {
		user: null,
		answers: [],
	};
	try {
		const cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
		if (!cookies.get('token')) {
			return {
				props,
			};
		}
		const token = cookies.get('token');
		const result = await axios.get('https://moti.company/api/v1/users/my', {
			headers: { Authorization: token },
		});
		props.user = result.data.data;
		if (props.user) {
			const answers = await axios.get('https://moti.company/api/v1/answers/list', {
				headers: { Authorization: token },
			});
			props.answers = answers.data.data;
		}
		return {
			props,
		};
	} catch (error) {
		console.log(error.message);
		return {
			props,
		};
	}
};

export default Album;
