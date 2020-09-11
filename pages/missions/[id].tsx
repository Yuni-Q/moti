import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import ContentComponent from '../../components/ContentComponent';
import FileInput from '../../components/FileInput';
import Header from '../../components/Header';
import { StyeldForm, StyledBottomButton, StyledCardFrame, StyledCardFrameWrapper, StyledSubTitle } from '../../components/StyledComponent';
import Submit from '../../components/Submit';
import Mission from '../../models/Mission';

interface Props {
	mission: Mission;
}

const MissionPage: React.FC<Props> = ({ mission }) => {
	const [content, setContent] = useState('');
	const [file, setFile] = useState<File>({} as File);
	const [isSubmit, setIsSubmit] = useState(false);
	const onSubmit = async () => {
		try {
			const cookies = new Cookies();
			const formData = new FormData();
			if (mission.isContent) {
				formData.append('content', content);
				if(!content) {
					alert('내용을 입력해 주세요.')
				}
			}
			formData.append('missionId', String(mission.id));
			if (mission.isImage) {
				if(!file.type) {
					alert('이미지를 첨부해주세요.')
				}
				formData.append('file', new Blob([file], { type: 'application/octet-stream' }));
			}
			await axios.post('https://moti.company/api/v1/answers', formData, {
				headers: { Authorization: cookies.get('token'), 'Content-Type': 'multipart/form-data' },
			});
			setIsSubmit(true);
		} catch (error) {
			console.log('error', error);
		}
	};
	if (mission.isImage && !file.type) {
		return <FileInput mission={mission} setFile={setFile} />;
	}
	if (isSubmit) {
		return <Submit />;
	}
	return (
		<StyeldForm onSubmit={onSubmit}>
			<Header isLeftButton title="답변 하기" />
			<StyledSubTitle>{mission.title}</StyledSubTitle>
			<StyledCardFrameWrapper>
				<StyledCardFrame src="/static/assets/images/imgCardframe.png" alt="imgCardframe" />
				<ContentComponent imgSrc={file.type ? URL.createObjectURL(file) : ''} setFile={setFile} isContent={mission?.isContent} content={content} setContent={setContent} />
			</StyledCardFrameWrapper>
			<StyledBottomButton type="submit" width={240}>
				답변하기
			</StyledBottomButton>
		</StyeldForm>
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

export default MissionPage;
