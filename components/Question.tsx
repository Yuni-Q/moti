import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import axios from 'axios';
import icTextformNormal from '../static/assets/images/icTextformNormal.png';
import icCameraNormal from '../static/assets/images/icCameraNormal.png';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';

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
	setIsQuestion: React.Dispatch<React.SetStateAction<boolean>>;
	missions: any[];
	refresh: boolean;
}

const Question: React.FC<Props> = ({ missions, refresh, setIsQuestion }) => {
	const router = useRouter();
	const [missionRefresh, setMissionRefresh] = useState(refresh);
	const [missionsState, setMissionState] = useState(missions);
	const [slideIndex, setSlideIndex] = useState(0);

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
				<button type="button" onClick={() => setIsQuestion(false)}>
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
			<StyledCarousel
				style={{ height: '100%' }}
				cellAlign="center"
				slidesToShow={1}
				slideWidth={0.8}
				cellSpacing={24}
				autoplay={false}
				defaultControlsConfig={{
					nextButtonStyle: { display: 'none' },
					prevButtonStyle: { display: 'none' },
				}}
				slideIndex={slideIndex}
				afterSlide={(newSlideIndex) => setSlideIndex(newSlideIndex)}
			>
				{missionsState.map((mission, index) => {
					return (
						<div
							key={mission.id}
							style={{
								margin: '16px 0 24px',
								flexShrink: 0,
								boxShadow: '0 0 10px 0 rgb(231, 188, 158)',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								borderRadius: 11,
								height: '90%',
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									width: '100%',
									padding: '16px',
									borderRadius: 11,
								}}
							>
								{mission.isImage && <img width="24" height="24" src={icCameraNormal} alt="icCameraNormal" />}
								{mission.isContent && (
									<img
										style={{ margin: '0 0 0 8px' }}
										width="24"
										height="24"
										src={icTextformNormal}
										alt="icTextformNormal"
									/>
								)}
							</div>
							<div style={{ margin: 16 }}>
								<div>질문 {index + 1}</div>
								<div style={{ margin: '16px 0 0', fontSize: 22 }}>{mission.title}</div>
							</div>
							<div style={{ textAlign: 'center', margin: '0 0 32px' }}>
								<button
									type="button"
									onClick={() => {
										router.push(`missions/${mission.id}`);
									}}
									style={{
										width: 240,
										height: 40,
										backgroundColor: 'rgb(222, 226, 230)',
										color: 'rgb(212, 161, 125)',
										borderRadius: 30,
									}}
								>
									답변하기
								</button>
							</div>
						</div>
					);
				})}
			</StyledCarousel>
			<div style={{ display: 'flex', margin: '24px 24px 36px' }}>
				{[0, 1, 2].map((num) => {
					return (
						<div
							key={num}
							style={{
								margin: '0 8px',
							}}
						>
							<button
								type="button"
								onClick={() => setSlideIndex(num)}
								style={{
									width: 8,
									height: 8,
									borderRadius: 8,
									backgroundColor: num === slideIndex ? '#d4a17d' : 'rgb(68, 68, 68)',
									marginTop: 8,
									fontSize: 0,
								}}
							>
								dot
							</button>
						</div>
					);
				})}
			</div>
			<button
				onClick={async () => {
					if (missionRefresh) {
						try {
							const cookies = new Cookies();
							const result = await axios.get('https://moti.company/api/v1/missions/refresh', {
								headers: { Authorization: cookies.get('token') },
							});
							setMissionRefresh(result.data.data.refresh);
							setMissionState(result.data.data.missions);
						} catch (error) {
							console.error('error', error);
						}
					}
				}}
				type="button"
				style={{
					width: 201,
					height: 44,
					margin: '0 0 32px 0',
					border: '1px solid rgb(231, 188, 158)',
					borderRadius: 22,
					flexShrink: 0,
				}}
			>
				질문 다시받기 {refresh ? '1' : '0'} / 1
			</button>
		</div>
	);
};

export default Question;
