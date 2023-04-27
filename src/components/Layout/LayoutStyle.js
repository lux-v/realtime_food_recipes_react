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
