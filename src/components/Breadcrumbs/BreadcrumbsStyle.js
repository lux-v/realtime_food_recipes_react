import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, breakpoints } from '../../lib/style/theme';

export const Breadcrumbs = styled.div`
  display: none;

  @media (${breakpoints.desktop}) {
    display: flex;
    align-items: center;
  }
`;

export const BreadcrumbsLink = styled(Link)`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textPrimary};

  ${(props) =>
    props.index + 1 < props.pathLength &&
    `text-decoration: underline; 
    color: ${colors.link};
    text-underline-offset: 2px;
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
