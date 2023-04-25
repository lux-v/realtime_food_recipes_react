import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

import {
    SidebarWrapper,
    HeaderNavLink,
    Food as FoodIcon,
    AboutUs as AboutUsIcon,
    HowItWorks as HowItWorksIcon,
    LogOut as LogOutIcon,
    YourProfile as YourProfileIcon,
    ItemsWrapper,
    IconTextWrapper,
} from './SidebarStyle';


const Sidebar = () => {
    const { logout, isSidebarOpen } = useContext(AuthContext);


    return (
        <SidebarWrapper isSidebarOpen={isSidebarOpen}>
            <ItemsWrapper>
                <HeaderNavLink to="/">
                    {isSidebarOpen ?
                        <IconTextWrapper >
                            <FoodIcon />
                            Recipes
                        </IconTextWrapper> : <FoodIcon />}
                </HeaderNavLink>
                <HeaderNavLink className="mobileNav" to="/profile">

                    {isSidebarOpen ?
                        <IconTextWrapper >
                            <YourProfileIcon />
                            Your profile
                        </IconTextWrapper> : <YourProfileIcon />}
                </HeaderNavLink>
                <HeaderNavLink to="/how-it-works">

                    {isSidebarOpen ?
                        <IconTextWrapper >
                            <HowItWorksIcon />
                            How It Works
                        </IconTextWrapper> : <HowItWorksIcon />}
                </HeaderNavLink>
                <HeaderNavLink to="/about-us">

                    {isSidebarOpen ?
                        <IconTextWrapper >
                            <AboutUsIcon />
                            About us
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
        </SidebarWrapper>
    );
};
export default Sidebar;
