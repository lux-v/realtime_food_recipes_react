import styled from "styled-components";
import { colors, breakpoints } from '../../lib/style/theme';
import { ReactComponent as Close } from '../../assets/img/x-icon.svg';

export const Modal = styled.dialog`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 272px;
    min-height: 215px;

    border: none;
    border-radius: 16px;

    @media (${breakpoints.tablet}) {
        width: 560px;
        min-height: 257px;
    }

    ::backdrop {
        background-color: ${({ theme }) => theme.modalBackground};
    }

`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 68px;
  padding: 25px 16px;

  @media (${breakpoints.tablet}) {
    padding: 22px 24px;
  }
`;

export const Title = styled.div`
  height: 19px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.textPrimary};

  @media (${breakpoints.tablet}) {
    height: 24px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  min-height: 89px;
  width: 239px;
  padding: 17px 0px 32px 17px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.textSecondary};

  @media (${breakpoints.tablet}) {
    min-height: 131px;
    padding: 25px 0px 40px 24px;
    font-size: 16px;
    line-height: 22px;
    width: 495px;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 0 17px 22px 17px;
`;

export const CloseIcon = styled(Close)`
  width: 14px;
  height: 14px;

  path {
    fill: ${({ theme }) => theme.textSecondary};
  }
`;

export const CloseIconWrapper = styled.div`
  padding: 5px; 
  border-radius: 50%; 
  width: 40px; 
  height: 40px; 
  display: flex; 
  justify-content: center; 
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    :hover{
      background: rgba(0,0,0,0.1);
      cursor: pointer;
    }
  }
`;