import React, { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import imgCardframe from '../static/assets/images/imgCardframe.png';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import normal from '../static/assets/images/normal.png';
import icRewriteNormal from '../static/assets/images/icRewriteNormal.png';

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
	cardArray: any[];
	setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswerDetail: React.FC<Props> = ({ cardArray, setIsDetail }) => {
	console.log('cardArray', cardArray);
	const router = useRouter();
	const [slideIndex, setSlideIndex] = useState(0);
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
				<button type="button" onClick={() => setIsDetail(false)}>
					<img
						style={{ position: 'absolute', margin: '0 12px', top: 24 }}
						width={24}
						height={24}
						src={icArrowLeft}
						alt="icArrowLeft"
					/>
				</button>
				<div style={{ flex: 1, color: 'rgb(241, 219, 205)', textAlign: 'center' }}>
					{moment(cardArray[slideIndex].date).format('YYYY. MM. DD')}
				</div>
				<button type="button" onClick={() => router.push('/album')}>
					<img
						style={{ position: 'absolute', margin: '0 12px', top: 24, right: 0 }}
						width={24}
						height={24}
						src={normal}
						alt="normal"
					/>
				</button>
			</div>
			<div style={{ display: 'flex', margin: '24px 24px 16px', justifyContent: 'center' }}>
				{cardArray.map((value, index) => {
					return (
						<div
							key={value.id}
							style={{
								margin: '0 8px',
							}}
						>
							<button
								type="button"
								 onClick={() => setSlideIndex(index)}
								style={{
									width: 8,
									height: 8,
									borderRadius: 8,
									backgroundColor: index === slideIndex ? '#d4a17d' : 'rgb(68, 68, 68)',
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

			<StyledCarousel
				style={{ height: '100%' }}
				cellAlign="center"
				slidesToShow={1}
				cellSpacing={24}
				autoplay={false}
				defaultControlsConfig={{
					nextButtonStyle: { display: 'none' },
					prevButtonStyle: { display: 'none' },
				}}
				slideIndex={slideIndex}
				afterSlide={(newSlideIndex) => setSlideIndex(newSlideIndex)}
			>
				{cardArray.map((answer) => {
					return (
						<div key={answer.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
							<div style={{ padding: '16px 60px 0 24px ', fontSize: 24, position: 'relative' }}>
								<div>{answer.mission.title}</div>
								<button type="button" onClick={() => router.push(`/answers/${answer.id}`)}>
									<img
										style={{ position: 'absolute', margin: '0 12px', top: 20, right: 0 }}
										width={24}
										height={24}
										src={icRewriteNormal}
										alt="icRewriteNormal"
									/>
								</button>
							</div>
							<div
								style={{
									margin: '56px auto 0',
									width: 311,
									height: 482,
									boxShadow: '0 0 10px 0 rgb(231, 188, 158)',
									borderRadius: 11,
									position: 'relative',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<img src={imgCardframe} width="287" alt="imgCardframe" style={{ margin: 12, position: 'absolute' }} />
								{answer.imageUrl && (
									<img src={answer.imageUrl} alt="imgaeUrl" width="80%" style={{ zIndex: 10, margin: '25px auto 0' }} />
								)}
								<div
									style={{
										height: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										zIndex: 10,
										background: 'initial',
										overflow: 'scroll',
									}}
								>
									{answer.content}
								</div>
							</div>
						</div>
					);
				})}
			</StyledCarousel>
		</div>
	);
};

export default AnswerDetail;
