import styled from 'styled-components';
import { css } from 'styled-components';
import { colors, breakpoints } from '../../../lib/style/theme';


export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  

  @media (${breakpoints.desktop}) {
    width: ${props => props.isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 80px)"};
    transition: width 0.2s ease-in;
  }
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  height:100%;
  padding: 24px 24px 50px 24px;
  background-color: ${colors.bgPrimary};
  margin: auto 0;

  overflow:auto;


  @media (${breakpoints.tablet}) {
    padding: 40px 72px;

  
  }

  @media (${breakpoints.desktop}) {
    padding: 40px;

  
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

export const ChildrenWrapper = styled.div`
    height: ${props => props.showHeading ? "calc(100% - 83px)" : "100%"};
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
