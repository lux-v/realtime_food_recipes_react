import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

import {
    NavWrapper,
    HeaderNavLink,
    Food as FoodIcon,
    Dashboard as DashboardIcon,
    AboutUs as AboutUsIcon,
    HowItWorks as HowItWorksIcon,
    LogOut as LogOutIcon,
    YourProfile as YourProfileIcon,
    ItemsWrapper,
    IconTextWrapper,
    IconText,
} from './SidebarStyle';
import PresetColor from '../../PresetColor/PresetColor';


const Sidebar = () => {
    const { logout, isSidebarOpen } = useContext(AuthContext);

    return (
        <NavWrapper isSidebarOpen={isSidebarOpen}>
            <ItemsWrapper isSidebarOpen={isSidebarOpen}>
                <HeaderNavLink to="/">
                    {isSidebarOpen ?
                        <IconTextWrapper >
                            <DashboardIcon />
                            <IconText>Dashboard</IconText>
                        </IconTextWrapper> : <DashboardIcon />}
                </HeaderNavLink>
                <HeaderNavLink to="/recipes">
                    {isSidebarOpen ?
                        <IconTextWrapper >
                            <FoodIcon />
                            <IconText>Recipes</IconText>
                        </IconTextWrapper> : <FoodIcon />}
                </HeaderNavLink>
                <HeaderNavLink className="mobileNav" to="/account-settings">
                    {isSidebarOpen ?
                        <IconTextWrapper >
                            <YourProfileIcon />
                            <IconText>Your profile</IconText>
                        </IconTextWrapper> : <YourProfileIcon />}
                </HeaderNavLink>
                <HeaderNavLink to="/how-it-works">

                    {isSidebarOpen ?
                        <IconTextWrapper >
                            <HowItWorksIcon />
                            <IconText>How It Works</IconText>
                        </IconTextWrapper> : <HowItWorksIcon />}
                </HeaderNavLink>
                <HeaderNavLink to="/about-us">

                    {isSidebarOpen ?
                        <IconTextWrapper >
                            <AboutUsIcon />
                            <IconText>About us</IconText>
                        </IconTextWrapper> : <AboutUsIcon />}
                </HeaderNavLink>



                <HeaderNavLink
                    onClick={logout}
                    className="mobileNav"
                    to="/login"
                >
                    <IconTextWrapper >
                        <LogOutIcon />
                        Log out
                    </IconTextWrapper>
                </HeaderNavLink>
            </ItemsWrapper>
        </NavWrapper>
    );
};
export default Sidebar;
