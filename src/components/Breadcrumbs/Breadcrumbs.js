import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumbs as BreadcrumbsWrapper,
  BreadcrumbsLink,
  ChevronIcon,
  Dashboard as DashboardIcon,
} from './BreadcrumbsStyle';

import ChevronRight from '../../assets/img/chevron-right.svg';

const Breadcrumbs = () => {
  let currentLocation = useLocation();

  const pathNames = currentLocation.pathname.split('/').filter((x) => x);

  const formatRouteNameForDisplay = (path) => {
    const splitByDash = path.split('-');

    //! If route has only one word then just capitalize that word
    if (splitByDash.length === 1) {
      return capitalizeFirstWord(path);
    }

    //! If route has multiple words eg. "add-new-student" then route is split into seperate words
    //! and first of those words is capitalized and other words are just concatenated to the first word
    let finalRouteName;
    splitByDash.forEach((word, index) => {
      if (index === 0) {
        finalRouteName = capitalizeFirstWord(word);
        word = '';
      }
      finalRouteName += ` ${word}`;
    });

    return finalRouteName;
  };

  const capitalizeFirstWord = (path) => {
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const checkIfRouteIsNotLast = (index) => {
    if (index + 1 !== pathNames.length) {
      return true;
    }

    return false;
  };

  return (
    <BreadcrumbsWrapper empty={pathNames.length === 0}>
      {pathNames.length > 0 &&
        <>
          <BreadcrumbsLink
            to={"/"}
          >
            <DashboardIcon />
          </BreadcrumbsLink>

          <ChevronIcon src={ChevronRight} />
        </>
      }
      {pathNames.map((path, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
        return (
          <React.Fragment key={index}>
            <BreadcrumbsLink
              pathLength={pathNames.length}
              index={index}
              to={index + 1 < pathNames.length && routeTo}
            >
              {formatRouteNameForDisplay(path)}
            </BreadcrumbsLink>
            {checkIfRouteIsNotLast(index) && <ChevronIcon src={ChevronRight} />}
          </React.Fragment>
        );
      })}
    </BreadcrumbsWrapper>
  );
};
export default Breadcrumbs;
