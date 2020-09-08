import { useRouter } from 'next/router';
import React from 'react';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import imgCam from '../static/assets/images/imgCam.png';

interface Props {
	mission: any;
	setImage: React.Dispatch<React.SetStateAction<File>>;
}

const Image: React.FC<Props> = ({ mission, setImage }) => {
	const router = useRouter();
	// const [missionRefresh, setMissionRefresh] = useState(refresh);
	// const [missionsState, setMissionState] = useState(missions);
	// const [slideIndex, setSlideIndex] = useState(0);

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'space-between',
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
				<button type="button" onClick={() => router.back()}>
					<img
						style={{ position: 'absolute', margin: '0 12px', top: 24, left: 0 }}
						width={24}
						height={24}
						src={icArrowLeft}
						alt="icArrowLeft"
					/>
				</button>
				<div style={{ flex: 1, color: 'rgb(241, 219, 205)', textAlign: 'center' }}>질문 선택</div>
			</div>
			<div style={{ fontSize: 24, margin: '8px 24px 56px' }}>{mission.title}</div>
			<div>
				<img src={imgCam} alt="imgCam" width="202" height="202" />
			</div>
			<div>
				<label
					style={{
						margin: '0 0 148px 0',
						width: 168,
						height: 40,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 20,
						backgroundColor: '#fff',
						color: 'rgb(212, 161, 125)',
						boxShadow: '0 0 10px 0 rgb(252, 222, 227)',
					}}
					htmlFor="file"
				>
					이미지 업로드
				</label>
				<input
					type="file"
					id="file"
					style={{
						display: 'none',
					}}
					onChange={(e) => {
						if (e.target.files && typeof e.target.files[0] === 'object') {
							setImage(e.target.files[0]);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default Image;
