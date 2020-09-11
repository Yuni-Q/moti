import React, { useCallback, useState } from 'react';
import Cookies from 'universal-cookie';
import ContentComponent from '../../components/ContentComponent';
import Header from '../../components/Header';
import { StyeldForm, StyledBottomButton, StyledCardFrame, StyledCardFrameWrapper, StyledSubTitle } from '../../components/StyledComponent';
import Submit from '../../components/Submit';
import Answer from '../../models/Answer';
import { redirectRoot, checkUser } from '../../utils/redirect';
import Cookie from '../../utils/Cookie';

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
			console.log('error', error);
		}
	}, [answer, content, file])
	if (isSubmit) {
		return <Submit />;
	}
	return (
		<StyeldForm onSubmit={onSubmit}>
			<Header title='답변 수정하기' isLeftButton />
			<StyledSubTitle>{answer.mission?.title}</StyledSubTitle>
			<StyledCardFrameWrapper>
				<StyledCardFrame src="/static/assets/images/imgCardframe.png" alt="imgCardframe" />
				<ContentComponent imgSrc={file.type?  URL.createObjectURL(file) : file.name}  setFile={setFile} isContent={answer.mission?.isContent} content={content} setContent={setContent} />
			</StyledCardFrameWrapper>
			<StyledBottomButton type="submit" width={240}>
				답변하기
			</StyledBottomButton>
		</StyeldForm>
	);
};

export const getServerSideProps = async (context: any) => {
	const props = {
		answer: {},
	};
	const { res } = context;

	try {
		const token = Cookie.getToken(context.req);
		const isUser = await checkUser({res, token});
		if(!isUser) {
			return res.end();
		}
		
		const {id} = context.params;
		const answer = await Answer.getAnswersId({id, token});
		props.answer = answer;
		return {
			props,
		};
	} catch (error) {
		console.log(error);
		redirectRoot(res);
		return res.end();
	}
};

export default AnswerPage;
