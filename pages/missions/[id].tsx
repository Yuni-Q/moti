import React, { useCallback, useState } from 'react';
import ContentComponent from '../../components/ContentComponent';
import FileInput from '../../components/FileInput';
import Header from '../../components/Header';
import { StyeldForm, StyledBottomButton, StyledCardFrame, StyledCardFrameWrapper, StyledSubTitle } from '../../components/StyledComponent';
import Submit from '../../components/Submit';
import Answer from '../../models/Answer';
import Mission from '../../models/Mission';
import Cookie from '../../utils/Cookie';
import { checkUser, redirectRoot } from '../../utils/redirect';
import { PageContext } from '../_app';
import { log } from '../../utils/log';

interface Props {
	mission: Mission;
}

const MissionPage: React.FC<Props> = ({ mission }) => {
	const [content, setContent] = useState('');
	const [file, setFile] = useState<File>({} as File);
	const [isSubmit, setIsSubmit] = useState(false);
	const onSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const token = Cookie.getToken();
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
			await Answer.postAnswers({formData, token});
			setIsSubmit(true);
		} catch (error) {
			log('error', error);
		}
	}, [content, file, mission.id, mission.isContent, mission.isImage]);
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

interface ServerSideProps {
	props: {
		mission: Mission;
	}
}

export const getServerSideProps = async ({req, res, params}: PageContext): Promise<void | ServerSideProps> => {
	const props = {
		mission: {} as Mission,
	};
	try {
		const token = Cookie.getToken(req);
		const isUser = await checkUser({res, token});
		if(!isUser) {
			return res.end(); 
		}
		const weekAnswers = await Answer.getAnswersWeek(token);
		const check = weekAnswers.answers.filter((answer: Answer) => {
			return answer.date === weekAnswers.today;
		});
		if (check.length > 0) {
			redirectRoot(res);
			return res.end(); 
		}
		const { id } = params;
		if(!id) {
			redirectRoot(res);
			return res.end(); 
		}
		const mission: Mission = await Mission.getMissionsId({id, token});
		if(!mission) {
			redirectRoot(res);
			return res.end(); 
		}
		props.mission = mission;
		return {
			props,
		};
	} catch (error) {
		log('error', error);
		redirectRoot(res);
		return res.end(); 
	}
};

export default MissionPage;
