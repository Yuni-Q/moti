import { useRouter } from 'next/router';
import React from 'react';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import { StyldHeader, StyledIcon, StyledTitle } from "./StyledComponent";

interface Props {
    isLeftButton?: boolean;
    onClickLeftButton?: () => void;
    title: string;
}

const Header: React.FC<Props> = ({title, isLeftButton, onClickLeftButton}) => {
    const router = useRouter();
    return (
        <StyldHeader>
                {isLeftButton && <button type="button" onClick={() =>{ 
                    if(!onClickLeftButton) {
                        return router.back();
                    }
                    onClickLeftButton();
                    }}>
					<StyledIcon
						width={24}
						height={24}
						src={icArrowLeft}
						alt="icArrowLeft"
					/>
				</button>}
				<StyledTitle>{title}</StyledTitle>
            
        </StyldHeader>
    )
}

export default Header;