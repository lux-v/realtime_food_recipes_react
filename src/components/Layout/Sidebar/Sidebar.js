import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

import {
    Sidebar as SidebarWrapper,
    LogoImg as LogoElement,
    LogoLink,
    MenuWrapper,
    LogoText,
    MenuText,
    ExitImg as ExitElement,
    Nav,
    OptionsWrapper,
    HeaderNavLink,
    Lectures as LecturesIcon,
    Students as StudentsIcon,
    Criteria as CriteriaIcon,
    LogOut as LogOutIcon,
    YourProfile as YourProfileIcon,
} from './SidebarStyle';

import LogoImg from '../../../assets/img/logo.png';
import ExitIcon from '../../../assets/img/exit-icon.svg';

const Header = ({ openHamburger, handleHamburgerClick }) => {
    const { setIsLoggedIn, setUserData } = useContext(AuthContext);

    const handleLogOut = () => {
        setIsLoggedIn(false);
        localStorage.clear('accessToken');
        setUserData(null);
    };

    return (
        <SidebarWrapper openHamburger={openHamburger}>
            <LogoLink className="desktopNav" to="/dashboard">
                <LogoElement src={LogoImg} alt="logo"></LogoElement>
            </LogoLink>
            <MenuWrapper className="mobileTabletNav" to="">
                <MenuText>Menu</MenuText>
                <ExitElement
                    src={ExitIcon}
                    alt="exitIcon"
                    onClick={handleHamburgerClick}
                ></ExitElement>
            </MenuWrapper>
            <Nav>
                <OptionsWrapper>
                    <HeaderNavLink to="/dashboard">
                        <LecturesIcon />
                        Dashboard
                    </HeaderNavLink>
                    <HeaderNavLink to="/students">
                        <StudentsIcon />
                        Students
                    </HeaderNavLink>
                    <HeaderNavLink to="/criteria">
                        <CriteriaIcon />
                        Criteria
                    </HeaderNavLink>
                    <HeaderNavLink className="mobileNav" to="/profile">
                        <YourProfileIcon />
                        Your profile
                    </HeaderNavLink>
                </OptionsWrapper>
                <HeaderNavLink onClick={handleLogOut} className="mobileNav" to="/login">
                    <LogOutIcon />
                    Log out
                </HeaderNavLink>
            </Nav>
        </SidebarWrapper>
    );
};
export default Header;
