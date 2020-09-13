import { useRouter } from 'next/router';
import React from 'react';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import { StyldHeader, StyledIcon, StyledTitle } from "./StyledComponent";

interface Props {
    left?: {
        onClick?: () => void;
    }
    title: string;
    right?: {
        onClick: () => void;
        imgUrl: string;
        alt: string
    }
    
}

const Header: React.FC<Props> = ({title, left, right}) => {
    const router = useRouter();
    return (
        <StyldHeader>
                {left && <button type="button" onClick={() =>{ 
                    if(!left.onClick) {
                        return router.back();
                    }
                    left.onClick();
                    }}>
					<StyledIcon
						width={24}
						height={24}
						src={icArrowLeft}
						alt="icArrowLeft"
					/>
				</button>}
				<StyledTitle>{title}</StyledTitle>
                {right && <button type="button" onClick={() => right.onClick()}>
					<img
						style={{ position: 'absolute', margin: '0 12px', top: 24, right: 0 }}
						width={24}
						height={24}
						src={right.imgUrl}
						alt={right.alt}
					/>
				</button>}
        </StyldHeader>
    )
}

export default Header;