import styled from 'styled-components';
import { css } from 'styled-components';
import { colors, breakpoints } from '../../../lib/style/theme';

export const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 24px 24px 50px 24px;
  background-color: ${colors.bgPrimary};
  margin: auto 0;

  ${(props) =>
    props.isSecondary &&
    `
        position: relative;
        width: calc(100% + 48px);
        margin: 0 -24px;
  `}

  ${(props) =>
    props.isChangePassword &&
    `
        height: 100vh;
  `}

  @media (${breakpoints.tablet}) {
    padding: 40px 72px;

    ${(props) =>
      props.isSecondary &&
      `
        padding: 40px 0px 0px 72px;
        position: relative;
        max-width: 692px;
        width: 100%;
        margin: 0 -72px;
  `}
  }

  @media (${breakpoints.desktop}) {
    padding: 40px;

    ${(props) =>
      props.isSecondary &&
      `
        padding: 40px 0 40px 40px;
        position: relative;
        max-width: 897px;
        width: 100%;
        margin: 0 -40px;
  `}
  }
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  height: 43px;
  max-width: 572px;

  ${(props) =>
    props.isCentered === true &&
    `
      max-width: 100%;
    `}

  @media (${breakpoints.tablet}) {
    ${(props) =>
      props.floatLeft === true &&
      `
      align-items: flex-start;
      gap: 48px;
    `}
  }
`;

const TitleStyle = css`
  color: ${colors.textPrimary};
  font-size: 24px;
  font-weight: 500;
  line-height: 29px;

  @media (${breakpoints.tablet}) {
    font-size: 32px;
    line-height: 39px;

    ${(props) =>
      props.isSecondary &&
      `
    font-size: 24px;
    `}
  }

  ${(props) =>
    props.isSecondary &&
    `
    font-size: 20px;
  `}
`;

export const Title = styled.h1`
  ${TitleStyle}

  ${(props) =>
    props.isCentered &&
    `
        text-align: center;
        width: 100%;
  `}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 16px;
`;
