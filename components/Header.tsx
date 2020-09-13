import { useRouter } from 'next/router';
import React from 'react';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import { StyldHeader, StyledLeftIcon, StyledTitle, StyledRightIcon } from "./StyledComponent";

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
					<StyledLeftIcon
						width={24}
						height={24}
						src={icArrowLeft}
						alt="icArrowLeft"
					/>
				</button>}
				<StyledTitle>{title}</StyledTitle>
                {right && <button type="button" onClick={() => right.onClick()}>
					<StyledRightIcon
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