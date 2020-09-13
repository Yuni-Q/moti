import React, { useCallback, useState } from 'react';
import ContentComponent from '../../components/ContentComponent';
import Header from '../../components/Header';
import { StyeldForm, StyledBottomButton, StyledCardFrame, StyledCardFrameWrapper, StyledSubTitle } from '../../components/StyledComponent';
import Submit from '../../components/Submit';
import Answer from '../../models/Answer';
import Cookie from '../../utils/Cookie';
import { consoleError } from '../../utils/log';
import { redirectRoot } from '../../utils/redirect';
import { PageContext } from '../_app';

interface Props {
	answer: Answer;
}

const AnswerPage: React.FC<Props> = ({ answer }) => {
	const [content, setContent] = useState(answer.content || '');
	const [isSubmit, setIsSubmit] = useState(false);
	const [file, setFile] = useState<File>({name: answer.imageUrl || ''} as File);

	const onSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			if (answer.mission?.isContent) {
				if (!content) {
					return alert('답을 입력해 주세요.')
				}
			}
			formData.append('content', content);
			if (answer.mission?.isImage && !!file.type) {
				formData.append('file', new Blob([file], { type: 'application/octet-stream' }));
			}
			const token = Cookie.getToken();
			await Answer.putAnswersId({ formData, answer,token });
			setIsSubmit(true);
		} catch (error) {
			consoleError('error', error);
		}
	}, [answer, content, file])

	const onChangeContent = (newContent: string) => {
		setContent(newContent);
	}

	const onChangeFile = (newFile: File) => {
		setFile(newFile);
	}

	if (isSubmit) {
		return <Submit />;
	}
	
	return (
		<StyeldForm onSubmit={onSubmit}>
			<Header left={{}} title='답변 수정하기' />
			<StyledSubTitle>{answer.mission?.title}</StyledSubTitle>
			<StyledCardFrameWrapper>
				<StyledCardFrame src="/static/assets/images/imgCardframe.png" alt="imgCardframe" />
				<ContentComponent imgSrc={file.type?  URL.createObjectURL(file) : file.name}  onChangeFile={onChangeFile} isContent={answer.mission?.isContent} content={content} onChangeContent={onChangeContent} />
			</StyledCardFrameWrapper>
			<StyledBottomButton type="submit" width={240}>
				답변하기
			</StyledBottomButton>
		</StyeldForm>
	);
};

interface ServerSideProps {
	props: {
		answer: Answer;
	}
}

export const getServerSideProps = async ({req, res, params}: PageContext): Promise<void | ServerSideProps> => {
	const props = {
		answer: {} as Answer,
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

		const {id} = params;
		if(!id) {
			return redirectRoot(res);
		}

		const answer = await Answer.getAnswersId({id, token});
		if(!answer) {
			return redirectRoot(res);
		}
		props.answer = answer;
		return {
			props,
		};
	} catch (error) {
		consoleError('error', error);
		return redirectRoot(res);
	}
};

export default AnswerPage;
