import styled from 'styled-components';
import { css } from 'styled-components';
import { breakpoints, border } from '../../../lib/style/theme';


import BackgroundImage from "../../../assets/img/pattern.jpg";

export const Background = styled.img`
    background-image: url(${BackgroundImage});
    background-repeat: repeat;
    width: calc(100% - 20px);
    height:  calc(100% - 20px);

    opacity: 0.03;

    position: absolute;
    z-index: -1;
`



export const ContentWrapper = styled.main`
  min-height: 100vh;
  flex-grow: 1;
  background: ${({ theme }) => theme.mode === "dark" ? theme.bgPrimaryLight900 : theme.bgSecondaryLight100 || theme.bgPrimaryLight100};
  border-top-left-radius: ${border.borderRadius};
  border-top-right-radius: ${border.borderRadius};
  padding: 12px;
  z-index:0;
  position:relative;

  ${props => props.isLoggedIn && `
    min-height: calc(100vh - 60px);
    margin: 60px 10px 0 0px;
  `}

  @media(${breakpoints.tablet}){
    padding: 20px;
  }

  @media (${breakpoints.desktop}) {
    transition: all 0.2s ease-in;
    margin-left: ${props => props.isSidebarOpen === false && props.isLoggedIn === true && "-180px"}; 
  }
`;

export const NavigationWrapper = styled.div`
  position:relative;
  display: flex;
  flex-flow: wrap;
  flex-wrap:wrap;
  justify-content: space-between;
  align-items: center;
  gap:20px;

  min-height: 50px;

  color: ${({ theme }) => theme.mode === "dark" ? theme.white : theme.textPrimary};

  background:${({ theme }) => theme.mode === "dark" ? theme.bgPrimaryLight800 : theme.white};
  border-radius:${border.borderRadius};
  padding:5px 15px;
`;

export const TitleButtonWrapper = styled.div`
  display: flex;
  align-items:center;
  flex-wrap:wrap;
  gap:10px;
  justify-content:space-between;
  width:60%;
`;

export const ChildrenWrapper = styled.div`
  position:relative;
  padding-top:20px;
  align-items:flex-start;
  min-height: ${props => props.showHeading ? "calc(100% - 50px)" : "100%"};
`;


const TitleStyle = css`
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
