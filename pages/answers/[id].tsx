import React, { useCallback, useState } from 'react';
import Cookies from 'universal-cookie';
import Header from '../../components/Header';
import { StyeldForm, StyledBottomButton, StyledCardFrame, StyledCardFrameWrapper, StyledSubTitle, StyledTextAreaWrapper } from '../../components/StyledComponent';
import Submit from '../../components/Submit';
import Answer from '../../models/Answer';
import imgCardframe from '../../static/assets/images/imgCardframe.png';

interface Props {
	answer: Answer;
}

const AnswerPage: React.FC<Props> = ({ answer }) => {
	const [content, setContent] = useState(answer.content || '');
	const [isSubmit, setIsSubmit] = useState(false);
	const onSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			if (answer.mission?.isContent) {
				if (!content) {
					return alert('답을 입력해 주세요.')
				}
				formData.append('content', content);
				const cookies = new Cookies();
				const token = cookies.get('token');
				await Answer.editAnswer({ formData, answer,token });
			}
			setIsSubmit(true);
		} catch (error) {
			console.log('error', error);
		}
	}, [answer, content])
	if (isSubmit) {
		return <Submit />;
	}
	return (
		<StyeldForm onSubmit={onSubmit}>
			<Header title='답변 수정하기' isLeftButton />
			<StyledSubTitle>{answer.mission?.title}</StyledSubTitle>
			<StyledCardFrameWrapper>
				<StyledCardFrame src={imgCardframe} alt="imgCardframe" />
				<ContentComponent answer={answer} content={content} setContent={setContent} />
			</StyledCardFrameWrapper>
			<StyledBottomButton type="submit" width={240}>
				답변하기
			</StyledBottomButton>
		</StyeldForm>
	);
};

interface ContentComponentProps {
	answer: Answer;
	content: string;
	setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ContentComponent: React.FC<ContentComponentProps> = ({ answer, content, setContent }) => {
	if (!answer.mission?.isContent) {
		return null;
	}
	return (
		<StyledTextAreaWrapper
			value={content}
			onChange={(e) => setContent(e.target.value)}
			placeholder="여기를 눌러 질문에 대한 답을 적어주세요"
		/>
	)
}

export const getServerSideProps = async (context: any) => {
	const props = {
		answer: {},
	};
	const { res } = context;
	try {
		const cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
		const token = cookies.get('token');
		if(!token) {
			res.setHeader('location', '/');
			res.statusCode = 302;
			res.end();
			return {
				props,
			};	
		}
		const {id} = context.params;
		const answer = await Answer.getAnswer({id, token});
		props.answer = answer;
		return {
			props,
		};
	} catch (error) {
		console.log(error);
		res.setHeader('location', '/');
		res.statusCode = 302;
		res.end();
		return {
			props,
		};
	}
};

export default AnswerPage;
