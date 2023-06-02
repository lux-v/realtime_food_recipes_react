import styled, { css } from "styled-components";
import { ReactComponent as Send } from "../../assets/icons/send-icon.svg";
import { border } from "../../lib/style/theme";

export const CommentSectionWrapper = styled.div`
  width: 100%;
  margin: 50px 0;
`;

export const CommentsLabel = styled.p`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

export const NewCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 8px;
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
`;

const IconStyle = css`
  height: 20px;
  width: 20px;
`;

export const SendIcon = styled(Send)`
  ${IconStyle}
`;

export const CommentIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  padding: 12px;
  border-radius: ${border.borderRadius};

  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }

  background: ${({ theme }) => theme.bgPrimaryLight50};

  :hover {
    background: ${({ theme }) => theme.bgPrimaryLight300};
  }
`;
