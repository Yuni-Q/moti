import React from 'react';
import { StyledTextAreaWrapper } from "./StyledComponent";

interface ContentComponentProps {
    imgSrc: string;
    isContent?: boolean;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ContentComponent: React.FC<ContentComponentProps> = ({imgSrc, isContent, content, setContent }) => {
    if (!isContent) {
        return null;
    }
    return (
        <>
        {imgSrc && <img src={imgSrc} alt="imageAsBase64" width="100%" />}
        {!!isContent && <StyledTextAreaWrapper
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="여기를 눌러 질문에 대한 답을 적어주세요"
        />}
        </>
    )
}
export default ContentComponent;