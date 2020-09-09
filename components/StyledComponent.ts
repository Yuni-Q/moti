import styled from 'styled-components'

const StyledDiv = styled.div``;

export default StyledDiv;

export const StyeldForm = styled.form`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`;

export const StyldHeader = styled.div`
    display: flex;
    height: 72px;
    align-items: center;
    position: relative;
    width: 100vw;
    flex-shrink: 0;
`;

export const StyledTitle = styled.div`
    flex: 1;
    color: rgb(241, 219, 205);
    text-align: center;
`;

export const StyledIcon = styled.img`
    position: absolute; 
    margin: 0 12px; 
    top: 24px;
    left: 0px;
`;

export const StyledSubTitle = styled.div`
    margin: 8px 24px 56px;
    font-size: 24px;
`;

export const StyledCardFrameWrapper = styled.div`
    width: calc(100% - 64px);
    box-shadow: 0 0 10px 0 rgb(231, 188, 158);
    border-radius: 11px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const StyledCardFrame = styled.img`
    width: calc(100% - 32px);
    margin: 12px;
`;

export const StyledTextAreaWrapper = styled.textarea`
    text-align: center;
    z-index: 10;
    width: calc(100% - 64px);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;
    position: absolute;
    border: none;
    text-align: center;
    padding: 60% 0;
    resize: none;
`;

export const StyledBottomButton = styled.button<{width: number}>`
    display: block;
    margin: 24px 0 36px;
    width: ${({width}) => width}px;
    height: 40px;
    background-color: rgb(222, 226, 230);
    color: rgb(212, 161, 125);
    border-radius: 30px;
`;