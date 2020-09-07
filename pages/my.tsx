import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import Cookies from 'universal-cookie';
import icRewriteNormal from '../static/assets/images/icRewriteNormal.png';
import imgMypage from '../static/assets/images/imgMypage.png';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import imgCardframe from '../static/assets/images/imgCardframe.png';

const StyledCarousel = styled(Carousel)`
	.slider-frame {
		ul.slider-list {
			height: 100% !important;
			li.slider-slide {
				height: 100% !important;
			}
		}
	}
	.slider-control-bottomcenter {
		display: none;
	}
`;

interface Props {
	user: any;
}

const My: React.FC<Props> = ({ user }) => {
	const router = useRouter();
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div style={{ display: 'flex', height: 72, alignItems: 'center', position: 'relative' }}>
				<button type="button" onClick={() => router.push('/')}>
					<img
						style={{ position: 'absolute', margin: '0 12px', top: 24 }}
						width={24}
						height={24}
						src={icArrowLeft}
						alt="icArrowLeft"
					/>
				</button>
				<div style={{ flex: 1, color: 'rgb(241, 219, 205)', textAlign: 'center' }}>마이페이지</div>
				<button type="button" onClick={() => router.push('/')}>
					<img
						style={{ position: 'absolute', margin: '0 12px', top: 24, right: 0 }}
						width={24}
						height={24}
						src={icRewriteNormal}
						alt="icRewriteNormal"
					/>
				</button>
			</div>
			<div style={{ display: 'flex', margin: '24px 24px 16px', justifyContent: 'center' }} />
			<div style={{ textAlign: 'center', margin: '8px 0 0' }}>
				<img src={imgMypage} alt="imgMypage" width="108" height="108" />
			</div>
			<div style={{ textAlign: 'center', margin: '16px 0 0' }}>{user.name} 님</div>
			<div
				style={{
					textAlign: 'center',
					margin: '26px 16px 0',
					borderTop: '1px solid rgb(255, 223, 223)',
					display: 'flex',
					justifyContent: 'space-between',
					height: 52,
					alignContent: 'center',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>닉네임</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>{user.name}</div>
			</div>
			<div
				style={{
					textAlign: 'center',
					margin: '0 16px 0',
					display: 'flex',
					justifyContent: 'space-between',
					height: 52,
					alignContent: 'center',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>생년월일</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>{user.birthday}</div>
			</div>
			<div
				style={{
					textAlign: 'center',
					margin: '0 16px 0',
					display: 'flex',
					justifyContent: 'space-between',
					height: 52,
					alignContent: 'center',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>성별</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>{user.gender ? user.gender : '미입력'}</div>
			</div>
			<div
				style={{
					textAlign: 'center',
					margin: '0 16px 0',
					borderTop: '1px solid rgb(255, 223, 223)',
					display: 'flex',
					justifyContent: 'flex-end',
					height: 52,
					alignContent: 'center',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>문의하기</div>
			</div>
			<div
				style={{
					textAlign: 'center',
					margin: '0 16px 0',
					display: 'flex',
					justifyContent: 'flex-end',
					height: 52,
					alignContent: 'center',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<a href="https://www.notion.so/MOTI-35d01dd331bb4aa0915c33d28d60b63c" target="_blank" rel="noreferrer">
						개인정보취급방침 및 이용약관
					</a>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async (context: any) => {
	const props = {
		user: null,
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

export default My;
