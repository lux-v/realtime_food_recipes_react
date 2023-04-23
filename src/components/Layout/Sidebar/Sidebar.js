import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

import {
    Sidebar as SidebarWrapper,
    LogoImg as LogoElement,
    LogoLink,
    MenuWrapper,
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


const Sidebar = ({ openHamburger, handleHamburgerClick }) => {
    const { logout } = useContext(AuthContext);


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
                    <HeaderNavLink to="/recipies">
                        <StudentsIcon />
                        Recipies
                    </HeaderNavLink>
                    <HeaderNavLink className="mobileNav" to="/profile">
                        <YourProfileIcon />
                        Your profile
                    </HeaderNavLink>
                    <HeaderNavLink to="/how-it-works">
                        <CriteriaIcon />
                        How It Works
                    </HeaderNavLink>
                    <HeaderNavLink to="/about-us">
                        <CriteriaIcon />
                        About us
                    </HeaderNavLink>
                </OptionsWrapper>

                <HeaderNavLink
                    onClick={logout}
                    className="mobileNav"
                    to="/login">

                    <LogOutIcon />
                    Log out
                </HeaderNavLink>
            </Nav>
        </SidebarWrapper>
    );
};
export default Sidebar;
