import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

import {
    SidebarWrapper,



    HeaderNavLink,

    Students as StudentsIcon,
    Criteria as CriteriaIcon,
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
                            <StudentsIcon />
                            Recipes
                        </IconTextWrapper> : <StudentsIcon />}
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
                            <CriteriaIcon />
                            How It Works
                        </IconTextWrapper> : <CriteriaIcon />}
                </HeaderNavLink>
                <HeaderNavLink to="/about-us">

                    {isSidebarOpen ?
                        <IconTextWrapper >
                            <CriteriaIcon />
                            About us
                        </IconTextWrapper> : <CriteriaIcon />}
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
