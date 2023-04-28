import styled from 'styled-components';
import { ReactComponent as ChevronRight } from '../../assets/img/chevron-right.svg';
import { colors, fonts } from '../../lib/style/theme.js';

export const Card = styled.div`
  font-family: ${fonts.primary};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 18px;
  gap: 10px;
  background-color: ${colors.secondary};
  color: ${colors.textMenu};
  width: 100%;
  cursor: pointer;
  position: relative;

  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${colors.lightRed};
  }
`;

export const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.secondary};
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  box-shadow: ${colors.boxShadow};
  width: 100%;
`;

export const SubMenuItem = styled(Card)`
  padding-left: 30px;
  background-color: ${colors.secondary};
  color: ${colors.textMenu};
`;

export const CaretIcon = styled(ChevronRight)`
  color: ${colors.textMenu};
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;
