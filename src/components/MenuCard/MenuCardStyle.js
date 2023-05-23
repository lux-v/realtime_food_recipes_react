import styled from 'styled-components';
import { ReactComponent as ChevronRight } from '../../assets/img/chevron-right.svg';
import { fonts } from '../../lib/style/theme.js';

export const Card = styled.div`
  font-family: ${fonts.primary};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 18px;
  gap: 10px;
  background-color: ${({ theme }) => theme.mode === "dark" ? theme.bgPrimaryLight800 : theme.secondary};
  color: ${({ theme }) => theme.mode === "dark" ? theme.white : theme.textMenu};
  width: 100%;

  position: relative;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transition: all 0.3s ease-in-out;
      background-color: ${({ theme }) => theme.mode === "dark" ? theme.bgPrimaryLight900 : theme.bgPrimaryLight50};
      cursor: pointer;
    }
  }

`;

export const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.secondary};
  position: absolute;
  top: 100%;
  left: 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
  width: 100%;
`;

export const SubMenuItem = styled(Card)`
  padding-left: 30px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textMenu};
`;

export const CaretIcon = styled(ChevronRight)`
  color: ${({ theme }) => theme.textMenu};
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;
