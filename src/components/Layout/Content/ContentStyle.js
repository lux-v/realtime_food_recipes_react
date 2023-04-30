import styled from 'styled-components';
import { css } from 'styled-components';
import { colors, breakpoints, border } from '../../../lib/style/theme';


export const ContentWrapper = styled.main`
  min-height: 100vh;
  z-index:1;
  flex-grow: 1;
  padding: 16px;
  background-color: ${colors.bgPrimary};
  border-top-left-radius: ${border.borderRadius};
  border-top-right-radius: ${border.borderRadius};

  ${props=> props.isLoggedIn &&`
    min-height: calc(100vh - 60px);
    margin: 60px 10px 0 10px;
  `}

  @media (${breakpoints.desktop}) {
    transition: all 0.2s ease-in;
    ${props=> props.isLoggedIn &&`
    margin: 60px 20px 0 0;
  `}
    margin-left: ${props => props.isSidebarOpen===false && props.isLoggedIn && "-180px"}; 


    padding:20px;
  }

`;

export const NavigationWrapper = styled.div`
  position:relative;
  display: flex;
  flex-flow: wrap;
  flex-wrap:wrap;
  justify-content: space-between;
  align-items: center;

  min-height:50px;

  background:${colors.white};
  border-radius:${border.borderRadius};
  padding:5px 15px;
  z-index:3;

`;

export const TitleButtonWrapper = styled.div`
  width:100%;
  display:flex;
  align-items:center;
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
  align-items:flex-start;

  z-index:2;
  min-height: ${props => props.showHeading ? "calc(100% - 50px)" : "100%"};
`;


const TitleStyle = css`
  color: ${colors.textPrimary};
  font-size: 20px;
  font-weight: 600;
  line-height: 22px;
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
