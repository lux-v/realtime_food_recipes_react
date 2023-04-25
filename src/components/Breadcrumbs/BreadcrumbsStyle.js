import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, breakpoints } from '../../lib/style/theme';

export const Breadcrumbs = styled.div`
  display: none;



  @media (${breakpoints.desktop}) {
    ${props=>props.empty!==true &&`
      display: initial;
      padding:2px 10px;
      border-radius:20px;
    `}

    background:${colors.lightRed};
  }
`;

export const BreadcrumbsLink = styled(Link)`
  font-weight: 500;
  font-size: 12.5px;
  line-height: 19px;
  color: ${colors.textPrimary};

  ${(props) =>
    props.index + 1 < props.pathLength &&
    `text-decoration: none; 
    color: ${colors.primary};

    `}

  &:hover {
    cursor: pointer;
  }
`;

export const ChevronIcon = styled.img`
  margin: 0px 0.75rem;
  width: 10px;
  height: 12px;
`;
