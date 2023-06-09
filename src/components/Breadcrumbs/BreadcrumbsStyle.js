import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from '../../assets/img/dashboard-icon.svg';

export const Dashboard = styled(DashboardIcon)`
  height:20px;
  width:auto;
  @media (hover: hover) and (pointer: fine) {
    cursor:pointer;
  }
  stroke: ${({ theme }) => theme.mode === "dark" ? "black" : theme.primaryMain};
`;


export const Breadcrumbs = styled.div`
    ${props => props.empty !== true && `
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content:flex-end;
      height:40px;
      padding-left:10px;
      border-radius:20px;
    `}

`;

export const BreadcrumbsLink = styled(Link)`
  font-weight: 500;
  font-size: 12.5px;
  color: ${({ theme }) => theme.mode === "dark" ? theme.white : theme.textPrimary};
  ${(props) =>
    props.index + 1 < props.pathLength &&
    `
      font-weight: 700;
      text-decoration: none; 
  `}

  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }
`;

export const ChevronIcon = styled.img`
  margin: 0px 0.75rem;
  width: 10px;
  height: 12px;
`;
