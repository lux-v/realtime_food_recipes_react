import { AuthContext } from '../../../context/AuthContext';
import { useContext, useEffect, useRef } from 'react';

import {
    NavWrapper,
    HeaderNavLink,
    Food as FoodIcon,
    Dashboard as DashboardIcon,
    AboutUs as AboutUsIcon,
    HowItWorks as HowItWorksIcon,
    LogOut as LogOutIcon,
    YourProfile as YourProfileIcon,
    ExitImg as ExitElement,
    ItemsWrapper,
    IconTextWrapper,
    MenuWrapper,
    MenuText,
} from './SidemenuStyle';

import ExitIcon from '../../../assets/img/exit-icon.svg';
import PresetColor from '../../PresetColor/PresetColor';


const Sidemenu = () => {
    const { logout, isSidebarOpen,setIsSidebarOpen } = useContext(AuthContext);
    const navWrapperRef = useRef(null);


    const handleHamburgerClick = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event) => {
        const sidemenuDimensions = navWrapperRef.current?.getBoundingClientRect()   || { top: 0, left: 0, width: 0, height: 0 };

        const isInNav = (sidemenuDimensions.top <= event.clientY && event.clientY <= sidemenuDimensions.top + sidemenuDimensions.height
            && sidemenuDimensions.left <= event.clientX && event.clientX <= sidemenuDimensions.left + sidemenuDimensions.width);
        if (!isInNav && navWrapperRef.current.clientHeight > 0 && navWrapperRef.current.clientWidth > 0 ) {
            setIsSidebarOpen(false)
        }
    };

    useEffect(() => {
      navWrapperRef.current &&
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <NavWrapper ref={navWrapperRef} isSidebarOpen={isSidebarOpen}>
              <MenuWrapper className="mobileTabletNav">
          <MenuText>Menu</MenuText>
          <ExitElement
            src={ExitIcon}
            alt="exitIcon"
            onClick={handleHamburgerClick}
          />
        </MenuWrapper>
        <ItemsWrapper>
          <HeaderNavLink to="/" onClick={() => setIsSidebarOpen(false)}>
              <IconTextWrapper >
                <DashboardIcon />
                Dashboard
              </IconTextWrapper>
          </HeaderNavLink>
          <HeaderNavLink to="/recipes" onClick={() => setIsSidebarOpen(false)}>
              <IconTextWrapper >
                <FoodIcon />
                Recipes
              </IconTextWrapper>
          </HeaderNavLink>
          <HeaderNavLink className="mobileNav" to="/account-settings" onClick={() => setIsSidebarOpen(false)}>
              <IconTextWrapper >
                <YourProfileIcon />
                Your profile
              </IconTextWrapper>
          </HeaderNavLink>
          <HeaderNavLink to="/how-it-works" onClick={() => setIsSidebarOpen(false)}>
              <IconTextWrapper >
                <HowItWorksIcon />
                How It Works
              </IconTextWrapper>
          </HeaderNavLink>
          <HeaderNavLink to="/about-us" onClick={() => setIsSidebarOpen(false)}>
              <IconTextWrapper >
                <AboutUsIcon />
                About us
              </IconTextWrapper>
          </HeaderNavLink>
          <div style={{ border: `1px solid #c5d0de`, borderRadius: "8px", margin: "10px" }}>
            <p style={{ borderBottom: "1px solid #c5d0de", padding: "10px", fontWeight: "600" }}>Preset Color</p>

            <div style={{ padding: "10px" }}>
              <PresetColor />
            </div>
          </div>
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
export default Sidemenu;
