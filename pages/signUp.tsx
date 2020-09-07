import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import imgMale from '../static/assets/images/imgMale.svg';
import imgFemale from '../static/assets/images/imgFemale.svg';

interface Props {
	token: string;
}

const getTitle = (step: number) => {
	if (step === 1) {
		return '닉네임 설정';
	}
	if (step === 2) {
		return '성별 선택';
	}
	if (step === 3) {
		return '생년월일 선택';
	}
	return '회원가입 완료';
};

const getSubTitle = (step: number) => {
	if (step === 1) {
		return '닉네임을 입력해주세요';
	}
	if (step === 2) {
		return '성별을 선택해주세요';
	}
	if (step === 3) {
		return '생년월일을 입력해주세요';
	}
	return <></>;
};
const SignUp: React.FC<Props> = ({ token }) => {
	const router = useRouter();

	const [step, setStep] = useState(1);
	const [name, setName] = useState('');
	const [gender, setGender] = useState('');
	const [year, setYear] = useState(1993);
	const [month, setMonth] = useState(2);
	const [day, setDay] = useState(16);
	const onSubmit = () => {
		console.log('onSubmit');
	};
	return (
		<form onSubmit={onSubmit}>
			<div
				style={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
				}}
			>
				<div style={{ display: 'flex', height: 72, alignItems: 'center', position: 'relative' }}>
					{(step === 2 || step === 3) && (
						<button type="button" onClick={() => setStep((oldStep) => oldStep - 1)}>
							<img
								style={{ position: 'absolute', margin: '0 12px', top: 24 }}
								width={24}
								height={24}
								src={icArrowLeft}
								alt="icArrowLeft"
							/>
						</button>
					)}
					<div style={{ flex: 1, color: 'rgb(241, 219, 205)', textAlign: 'center' }}>{getTitle(step)}</div>
				</div>
				<div style={{ fontSize: 24, margin: '32px 0', textAlign: 'center' }}>{getSubTitle(step)}</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						flex: 1,
						justifyContent: 'center',
						alignContent: 'center',
					}}
				>
					{step === 1 && (
						<div>
							<div>
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									style={{
										fontSize: 24,
										textAlign: 'center',
										border: 'none',
										borderBottom: '1px solid rgb(163, 118, 87)',
									}}
									maxLength={8}
									placeholder="8글자로 만들어주세요"
								/>
							</div>
							<div style={{ margin: '8px 0 0', color: 'rgb(121, 121, 121)', textAlign: 'center' }}>
								8글자로 만들어 주세요
							</div>
						</div>
					)}
					{step === 2 && (
						<div style={{ display: 'flex' }}>
							<div
								style={{
									position: 'relative',
									width: 113,
									boxShadow: '0 0 10px 0 rgb(231, 188, 158)',
									borderRadius: 11,
								}}
							>
								{gender !== 'male' && (
									<button
										type="button"
										style={{
											position: 'absolute',
											width: 140,
											height: '120%',
											top: -10,
											left: -10,
											backgroundColor: 'rgba(25,25,25,0.7)',
											fontSize: 0,
										}}
										onClick={() => setGender('male')}
									>
										male
									</button>
								)}
								<img style={{ margin: '20px 6px 18px' }} src={imgMale} alt="imgMale" width={101} height={115} />
								<div style={{ textAlign: 'center', margin: '0 0 12px' }}>MAN</div>
							</div>
							<div
								style={{
									position: 'relative',
									width: 113,
									margin: '0 0 0 36px',
									boxShadow: '0 0 10px 0 rgb(231, 188, 158)',
									borderRadius: 11,
								}}
							>
								{gender !== 'female' && (
									<button
										type="button"
										style={{
											position: 'absolute',
											width: 140,
											height: '120%',
											top: -10,
											left: -10,
											backgroundColor: 'rgba(25,25,25,0.7)',
											fontSize: 0,
										}}
										onClick={() => setGender('female')}
									>
										female
									</button>
								)}
								<img style={{ margin: '16px 25px 14px' }} src={imgFemale} alt="imgFemale" width={63} height={124} />
								<div style={{ textAlign: 'center', margin: '0 0 12px' }}>WOMAN</div>
							</div>
						</div>
					)}
					{step === 3 && (
						<div style={{ display: 'flex' }}>
							<div style={{ borderTop: '1px solid rgb(241, 219, 205)', borderBottom: '1px solid rgb(241, 219, 205)' }}>
								<input
									value={year}
									onChange={(e) => setYear(Number(e.target.value))}
									maxLength={4}
									type="number"
									style={{ fontSize: 24, border: 'none', width: 64, textAlign: 'center', padding: '8px 0' }}
								/>
							</div>
							<div
								style={{
									borderTop: '1px solid rgb(241, 219, 205)',
									borderBottom: '1px solid rgb(241, 219, 205)',
									margin: '0 0 0 8px',
								}}
							>
								<input
									max={12}
									value={month < 10 ? `0${month}` : month}
									onChange={(e) => setMonth(Number(e.target.value))}
									maxLength={2}
									type="number"
									style={{ fontSize: 24, border: 'none', width: 64, textAlign: 'center', padding: '8px 0' }}
								/>
							</div>
							<div
								style={{
									borderTop: '1px solid rgb(241, 219, 205)',
									borderBottom: '1px solid rgb(241, 219, 205)',
									margin: '0 0 0 8px',
								}}
							>
								<input
									max={31}
									value={day < 10 ? `0${day}` : day}
									onChange={(e) => setDay(Number(e.target.value))}
									maxLength={2}
									type="number"
									style={{ fontSize: 24, border: 'none', width: 64, textAlign: 'center', padding: '8px 0' }}
								/>
							</div>
						</div>
					)}
					{step === 4 && (
						<div style={{ fontSize: 24, textAlign: 'center' }}>
							{name}님<br />
							회원가입을
							<br />
							축하합니다!
							<br />
						</div>
					)}
				</div>
				<div style={{ textAlign: 'center', margin: step === 2 || step === 3 ? '0 0 88px 0' : '0 0 148px 0' }}>
					<div>
						<button
							type="button"
							onClick={async () => {
								if (step === 4) {
									return router.push('/');
								}
								if (step === 3) {
									try {
										await axios.put(
											'https://moti.company/api/v1/users',
											{
												name,
												gender,
												birthday: `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`,
											},
											{ headers: { Authorization: token } },
										);
									} catch (error) {
										console.log('error', error);
										return;
									}
								}
								if (step === 1 && name.length < 1) {
									return alert('name을 입력해 주세요 !!');
								}
								return setStep((oldStep) => oldStep + 1);
							}}
							style={{
								width: 240,
								height: 40,
								backgroundColor: 'rgb(222, 226, 230)',
								color: 'rgb(212, 161, 125)',
								borderRadius: 30,
							}}
						>
							{step !== 4 ? '다 음' : '시작하기'}
						</button>
					</div>
					{(step === 2 || step === 3) && (
						<div>
							<button
								type="button"
								style={{
									width: 240,
									height: 40,
									color: 'rgb(173, 181, 189)',
									borderRadius: 30,
									margin: '24px 0 0',
								}}
							>
								건너뛰기
							</button>
						</div>
					)}
				</div>
			</div>
		</form>
	);
};

export const getServerSideProps = async (context: any) => {
	const props = {
		token: '',
	};
	try {
		const cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
		props.token = cookies.get('token');
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

export default SignUp;
