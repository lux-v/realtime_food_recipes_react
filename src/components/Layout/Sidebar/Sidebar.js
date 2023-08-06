import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

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
} from "./SidebarStyle";


const items = [
  {
    icon: <DashboardIcon />,
    text: "Dashboard",
    link: "/",
  },
  {
    icon: <FoodIcon />,
    text: "Recipes",
    link: "/recipes",
  },
  {
    icon: <HowItWorksIcon />,
    text: "How It Works",
    link: "/how-it-works",
  },
  {
    icon: <AboutUsIcon />,
    text: "About us",
    link: "/about-us",
  },
];


const Sidebar = () => {
  const { isSidebarOpen } = useContext(AuthContext);

  return (
    <NavWrapper isSidebarOpen={isSidebarOpen}>
      <ItemsWrapper isSidebarOpen={isSidebarOpen}>
        {
          items.map((item, index) => (
            <HeaderNavLink key={index} to={item.link}>
              {isSidebarOpen ? (
                <IconTextWrapper>
                  {item.icon}
                  <IconText>{item.text}</IconText>
                </IconTextWrapper>
              ) : (
                item.icon
              )}
            </HeaderNavLink>
          ))
        }
      </ItemsWrapper>
    </NavWrapper>
  );
};
export default Sidebar;
