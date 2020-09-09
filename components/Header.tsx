import { useRouter } from 'next/router';
import React from 'react';
import icArrowLeft from '../static/assets/images/icArrowLeft.png';
import { StyldHeader, StyledIcon, StyledTitle } from "./StyledComponent";

interface Props {
    onClickLeftButton?: () => void;
    title: string;
}

const Header: React.FC<Props> = ({onClickLeftButton}) => {
    const router = useRouter();
    return (
        <StyldHeader>
                <button type="button" onClick={() =>{ 
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
				</button>
				<StyledTitle>답변 수정하기</StyledTitle>
            
        </StyldHeader>
    )
}

export default Header;