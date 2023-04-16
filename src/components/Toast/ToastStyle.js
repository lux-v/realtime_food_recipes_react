import styled from 'styled-components';
import { colors, breakpoints } from '../../lib/style/theme';

export const Toast = styled.div`
  position: fixed;
  top: 78px;
  right: 50%;
  transform: translate(50%);

  width: 272px;
  min-height: 52px;
  background-color: #545454;

  border: 1px solid #7f8591;
  border-radius: 8px;
  display: flex;
  align-items: center;

  @media (${breakpoints.tablet}) {
    right: 300px;
    width: 450px;
    min-height: 85px;

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
`;

export const Icon = styled.img`
  width: 20px;
  margin-left: 24px;
  align-self: flex-start;
  margin-top: 16px;

  @media (${breakpoints.tablet}) {
    margin-top: 19px;
    margin-bottom: 46px;
  }
`;
export const ContentWrapper = styled.div`
  @media (${breakpoints.tablet}) {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: fit-content;
    align-self: flex-start;
  }
`;

export const Title = styled.span`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  margin-left: 10px;
  color: #ffffff;

  @media (${breakpoints.tablet}) {
    margin: 16px 0px 2px 16px;
    font-weight: 500;
    font-size: 22px;
    line-height: 27px;
  }
`;

export const Content = styled.p`
  display: none;
  @media (${breakpoints.tablet}) {
    display: block;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: ${colors.secondary};
    margin-left: 16px;
    margin-bottom: 16px;
  }
`;

export const XButton = styled.img`
  display: none;
  cursor: pointer;

  @media (${breakpoints.tablet}) {
    display: block;
    margin: 38px 24px 35px 0px;
  }
`;
