import styled from 'styled-components';
import { css } from 'styled-components';
import { colors, breakpoints } from '../../../lib/style/theme';


export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  background-color: ${colors.bgPrimary};


  @media (${breakpoints.desktop}) {
    transition: width 0.2s ease-in;
  }
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  height:100%;
  padding: 16px 16px 25px 16px;

  margin: auto 0;

  overflow:auto;


  @media (${breakpoints.tablet}) {
    padding: 20px 36px;
  }

  @media (${breakpoints.desktop}) {
    padding: 20px;
  }
`;

export const Heading = styled.div`
  position:relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  /* height: 40px; */
  margin:8px;
  max-width: 572px;
  z-index:3;

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

export const ChildrenWrapper = styled.div`
  position:relative;

    /* display:grid; */
  align-items:flex-start;

  z-index:2;
  min-height: ${props => props.showHeading ? "calc(100% - 56px)" : "100%"};
`;


const TitleStyle = css`
  color: ${colors.textPrimary};
  font-size: 24px;
  font-weight: 500;
  line-height: 29px;

  @media (${breakpoints.tablet}) {
    font-size: 32px;
    line-height: 39px;   
  } 
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
