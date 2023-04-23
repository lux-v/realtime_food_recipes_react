import styled from 'styled-components';
import { colors, breakpoints } from '../../lib/style/theme';

export const LayoutWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

export const SidebarWrapper = styled.nav`
  display: none;
  width: 260px;
  min-height: 100vh;
  padding: 32px 24px 28px 0px;
  box-shadow: 16px 12px 20px 0px #00000000;
  background-color: ${colors.bgSecondary};

  @media (${breakpoints.tablet}) {
    padding: 24px 40px 0px 0px;
    width: 315px;
  }

  @media (${breakpoints.desktop}) {
    display: block;
    padding: 32px 0px 0px 16px;
    width: 240px;
  }
`;

export const RightWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 280px;
  width: 100%;

  @media (${breakpoints.desktop}) {
    width: calc(100% - 240px);
  }
`;
export const HeaderWrapper = styled.header`
  position: relative;
  width: 100%;
  height: 60px;
  padding: 9px 24px;
  user-select: none;
  background-color: ${colors.bgSecondary};
  box-shadow: 0px 3px 2px 0px #0000000a;
  z-index: 3;

  @media (${breakpoints.tablet}) {
    padding: 8px 87px 8px 70px;
  }

  @media (${breakpoints.desktop}) {
    padding: 10px 40px;
  }
`;
export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
`;
