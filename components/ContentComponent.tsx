import React from 'react';
import { StyldContentComponent, StyledFileInputImage, StyledTextAreaWrapper } from "./StyledComponent";

interface ContentComponentProps {
    imgSrc: string;
    isContent?: boolean;
    content: string;
    onChangeContent: (content: string) => void
    onChangeFile: (file: File) => void;
}

const ContentComponent: React.FC<ContentComponentProps> = ({imgSrc, isContent, content, onChangeContent, onChangeFile }) => {
    if (!isContent) {
        return null;
    }
    const onChagne = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && typeof event.target.files[0] === 'object') {
            onChangeFile(event.target.files[0]);
		}
	}
    return (
        <StyldContentComponent>
        {imgSrc && <StyledFileInputImage>
        <label htmlFor="file">
            <img className="mt-8" src={imgSrc} alt="imageAsBase64" width="100%" />
        </label>
            <input type="file" id="file" onChange={onChagne} />
        </StyledFileInputImage>
        }
        {!!isContent && <StyledTextAreaWrapper imgSrc={imgSrc}
            value={content}
            onChange={(e) => onChangeContent(e.target.value)}
            placeholder="여기를 눌러 질문에 대한 답을 적어주세요"
        />}
        </StyldContentComponent>
    )
}
export default ContentComponent;