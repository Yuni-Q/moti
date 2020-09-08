import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';

interface Props {
	user: any;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<Props> = ({ user, setIsEdit }) => {
	const [name, setName] = useState(user.name);
	const [birthday, setBirthday] = useState(user.birthday);
	const [gender, setGender] = useState(user.gender);
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
				<div style={{ flex: 1, color: 'rgb(241, 219, 205)', textAlign: 'center' }}>수정하기</div>
			</div>
			<div style={{ display: 'flex', margin: '24px 24px 16px', justifyContent: 'center' }} />

			<div
				style={{
					textAlign: 'center',
					margin: '8px 16px 0',
					borderTop: '1px solid rgb(255, 223, 223)',
					display: 'flex',
					justifyContent: 'space-between',
					height: 52,
					alignContent: 'center',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>닉네임</div>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ display: 'flex', alignItems: 'center', border: 'none' }}
				/>
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
				<input
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
					style={{ display: 'flex', alignItems: 'center', border: 'none' }}
				/>
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
				<input
					value={gender}
					onChange={(e) => setGender(e.target.value)}
					style={{ display: 'flex', alignItems: 'center', border: 'none' }}
				/>
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
				<div style={{ display: 'flex', alignItems: 'center' }}>로그아웃</div>
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
				<div style={{ display: 'flex', alignItems: 'center' }}>탈퇴하기</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
				<button
					type="button"
					style={{
						width: 136,
						height: 40,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 20,
						backgroundColor: '#fff',
						color: 'rgb(212, 161, 125)',
						boxShadow: '0 0 10px 0 rgb(252, 222, 227)',
					}}
					onClick={async () => {
						try {
							const cookies = new Cookies();
							const token = cookies.get('token');
							await axios.put(
								'https://moti.company/api/v1/users',
								{
									name,
									gender,
									birthday,
								},
								{ headers: { Authorization: token } },
							);
							setIsEdit(false);
						} catch (error) {
							console.log('error', error);
						}
					}}
				>
					저장하기
				</button>
			</div>
		</div>
	);
};

export default Profile;
