import styled from 'styled-components';
import { css } from 'styled-components';
import { colors, breakpoints, border } from '../../../lib/style/theme';


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


export const NavigationWrapper = styled.div`
  position:relative;
  display: flex;
  flex-direction:column;
  flex-wrap:wrap;
  justify-content: space-between;
  align-items: center;

  background:${colors.lightRed};
  border-radius:${border.borderRadius};
  padding:5px;
  z-index:3;

  @media (${breakpoints.tablet}) {
    flex-direction:row;
  }


`;

export const TitleButtonWrapper = styled.div`
  width:100%;
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  justify-content:space-between;

  @media (${breakpoints.tablet}) {
    width:60%;
  }
`;

export const ChildrenWrapper = styled.div`
  position:relative;
  padding-top:20px;

    /* display:grid; */
  align-items:flex-start;

  z-index:2;
  min-height: ${props => props.showHeading ? "calc(100% - 56px)" : "100%"};
`;


const TitleStyle = css`
  color: ${colors.textPrimary};
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  color:${colors.textTertiary};

  @media (${breakpoints.tablet}) {
    font-size: 28px;
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
