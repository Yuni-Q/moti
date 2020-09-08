import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import Submit from '../../components/Submit';
import Image from '../../components/Image';
import icArrowLeft from '../../static/assets/images/icArrowLeft.png';
import imgCardframe from '../../static/assets/images/imgCardframe.png';

interface Props {
	mission: any;
}

const Mission: React.FC<Props> = ({ mission }) => {
	console.log('mission', mission);
	const [content, setContent] = useState('');
	const [image, setImage] = useState<any>({});
	const [isSubmit, setIsSubmit] = useState(false);
	if (mission.isImage && !image.name) {
		return <Image mission={mission} setImage={setImage} />;
	}
	if (isSubmit) {
		return <Submit />;
	}
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'flex-start',
			}}
		>
			<div
				style={{
					display: 'flex',
					height: 72,
					alignItems: 'center',
					position: 'relative',
					width: '100vw',
					flexShrink: 0,
				}}
			>
				<button
					type="button"
					// onClick={() => setIsQuestion(false)}
				>
					<img
						style={{ position: 'absolute', margin: '0 12px', top: 24, left: 0 }}
						width={24}
						height={24}
						src={icArrowLeft}
						alt="icArrowLeft"
					/>
				</button>
				<div style={{ flex: 1, color: 'rgb(241, 219, 205)', textAlign: 'center' }}>답변 하기</div>
			</div>
			<div style={{ fontSize: 24, margin: '8px 24px 56px' }}>{mission.title}</div>
			<div
				style={{
					width: 311,
					height: 482,
					boxShadow: '0 0 10px 0 rgb(231, 188, 158)',
					borderRadius: 11,
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<img src={imgCardframe} width="287" alt="imgCardframe" style={{ margin: 12, position: 'absolute' }} />
				<div
					style={{
						textAlign: 'center',
						zIndex: 10,
						width: 255,
						margin: '28px auto 32px',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'column',
						flex: 1,
					}}
				>
					{image.name && <img src={URL.createObjectURL(image)} alt="imageAsBase64" width="100%" />}
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						style={{ flex: 1, width: '100%', border: 'none', textAlign: 'center', padding: '50% 0', resize: 'none' }}
						placeholder="여기를 눌러 질문에 대한 답을 적어주세요"
					/>
				</div>
				<div style={{ textAlign: 'center', margin: '24px 0 0' }}>
					<button
						type="button"
						onClick={async () => {
							try {
								const cookies = new Cookies();
								const formData = new FormData();
								if (mission.isContent) {
									formData.append('content', content);
									console.log(55, formData, content);
								}

								formData.append('missionId', mission.id);
								if (mission.isImage) {
									formData.append('file', new Blob([image], { type: 'application/octet-stream' }));
								}
								const result = await axios.post('http://localhost:8000/api/v1/answers', formData, {
									headers: { Authorization: cookies.get('token'), 'Content-Type': 'multipart/form-data' },
								});
								setIsSubmit(true);
							} catch (error) {
								console.log('error', JSON.stringify(error));
							}
						}}
						style={{
							width: 240,
							height: 40,
							backgroundColor: 'rgb(222, 226, 230)',
							color: 'rgb(212, 161, 125)',
							borderRadius: 30,
						}}
					>
						답변하기
					</button>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async (context: any) => {
	const props = {
		user: null,
		mission: {},
	};
	try {
		const cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
		console.log('contextcontext', context.params);
		const token = cookies.get('token');
		const result = await axios.get('https://moti.company/api/v1/users/my', {
			headers: { Authorization: token },
		});
		props.user = result.data.data;
		if (props.user) {
			const answers = await axios.get('https://moti.company/api/v1/answers/week', {
				headers: { Authorization: token },
			});
			const check = answers.data.data.answers.filter((answer: any) => {
				return answer.date === answers.data.data.today;
			});
			if (check.length > 0) {
				// const { res } = context;
				// res.setHeader('location', '/');
				// res.statusCode = 302;
				// return res.end();
			}
			const mission = await axios.get(`https://moti.company/api/v1/missions/${context.params.id}`, {
				headers: { Authorization: token },
			});
			props.mission = mission.data.data;
		}
		return {
			props,
		};
	} catch (error) {
		console.log(error.message);
		const { res } = context;
		res.setHeader('location', '/');
		res.statusCode = 302;
		res.end();
		return {
			props,
		};
	}
};

export default Mission;
