import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import Header from './Header';
import { StyeldForm, StyledBody, StyledBottomButton, StyledImg, StyledSubTitle } from './StyledComponent';

const Submit: React.FC = () => {
	const router = useRouter();
	const onSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		router.push('/');
	}, [router])
	return (
		<StyeldForm onSubmit={onSubmit}>
			<Header title="미션 완료" />
			<StyledBody>
				<StyledSubTitle>
					오늘의 질문에 답변을
					<br />
					완료했습닌다.
				</StyledSubTitle>
				<div className="mt-3">새로운 파츠를 얻었어요. 확인해볼까요?</div>
				<StyledImg className="my-7" width="108" height="108" src="/assets/images/imgMypage.png" alt="imgMypage" />
			</StyledBody>
			<StyledBottomButton type="submit" width={168}>
				확인하러 가기
				</StyledBottomButton>
		</StyeldForm>
	);
};

export default Submit;
