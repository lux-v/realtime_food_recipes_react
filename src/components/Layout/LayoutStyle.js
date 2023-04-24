import styled from 'styled-components';
import { colors, breakpoints } from '../../lib/style/theme';

export const LayoutWrapper = styled.div`
  height: 100%;
  width: 100%;
  /* display: flex;
  flex-direction:column; */
`;

export const BodyWrapper = styled.div`
  height: calc(100% - 60px);
  width: 100%;
  display: flex;
`;


export const SidebarWrapper = styled.nav`
  display: none;
  width: 260px;
  height: 100%;

  padding: 32px 14px;
  box-shadow: 16px 12px 20px 0px #00000000;
  background-color: ${colors.bgSecondary};


  @media (${breakpoints.tablet}) {
    width: 315px;
  }

  @media (${breakpoints.desktop}) {
    display: block;
    width: ${props => props.isSidebarOpen ? "240px" : "80px"};
    transition: width 0.2s ease-in;
  }
`;


