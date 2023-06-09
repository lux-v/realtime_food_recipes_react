import styled from 'styled-components';
import { breakpoints, border } from '../../lib/style/theme';

export const Toast = styled.div`
  position: fixed;
  z-index:3;
  top: 78px;
  right: 50%;
  transform: translate(50%);

  max-width: 272px;
  min-height: 40px;
  border-radius: ${border.borderRadius};
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  justify-content:space-between;

  @media (${breakpoints.tablet}) {
    right: 180px;
    max-width: 330px;

    @keyframes fadeIn {
      from {
        transform: translate(100%);
      }
      to {
        transform: translate(0);
      }
    }

    @keyframes fadeOut {
      from {
        transform: translate(0);
        opacity: 1;
      }
      to {
        transform: translate(100%);
        opacity: 0;
      }
    }
  }

  @keyframes fadeIn {
    from {
      transform: translate(150%);
    }
    to {
      transform: translate(50%);
    }
  }

  @keyframes fadeOut {
    from {
      transform: translate(50%);
      opacity: 1;
    }
    to {
      transform: translate(150%);
      opacity: 0;
    }
  }

  ${(props) =>
    props.isOpen === false
      ? `
        visibility: hidden;
        transition: visibility 0.5s;
        animation: fadeOut 0.5s;
      `
      : `
        visibility: visible;
        animation: fadeIn 0.5s 0s;
  `}
   

  ${({ toastType, theme }) =>
    toastType === "success" ? `
      background-color: ${theme.primarySuccess};
      border: 1px solid ${theme.secondarySuccess};
    `
      :
      toastType === "error" ? `
      background-color:${theme.primaryError};
      border: 1px solid ${theme.secondaryError};
    `
        :
        toastType === "warning" ? `
      background-color:${theme.primaryWarning};
      border: 1px solid ${theme.secondaryWarning};
    `
          : `
      background-color:${theme.primaryLight};
      border: 1px solid ${theme.primaryDark};
    `
  }
`;

export const ToastHeader = styled.div`
  display: flex;
  width: 100%;
  padding:5px 15px 5px 5px;
  align-items: center;
  justify-content: space-between;
`

export const TimerBar = styled.div.attrs(props => ({
  style: {
    width: `${(props.remainingTime / props.totalTime) * 100}% `,
    backgroundColor:
      props.toastType === "success" ? props.theme.secondarySuccess
        :
        props.toastType === "error" ? props.theme.secondaryError
          :
          props.toastType === "warning" ? props.theme.secondaryWarning : props.theme.secondaryInfo,

  }
}))`
  height: 5px;
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
`;


export const Icon = styled.img`
  width: 18x;
`;

export const IconTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;


export const ContentWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.textToast};

  padding: 8px 8px 12px 8px;
  font-size: 14px;
  overflow-wrap: anywhere;
`;

export const Title = styled.span`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: ${({ theme }) => theme.textToast};

  @media (${breakpoints.tablet}) {
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
  }
`;

export const XButton = styled.img`
  display: none;
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }

  @media (${breakpoints.tablet}) {
    display: block;
  }
`;
