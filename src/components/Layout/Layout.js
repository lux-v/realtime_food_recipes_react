import React from 'react';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';

import {
    ContentWrapper,
    HeaderWrapper,
    LayoutWrapper,
    RightWrapper,
    SidebarWrapper,
} from './LayoutStyle';

export default function Layout({
    title,
    isCentered = false,
    elements,
    children,
}) {
    return (
        <LayoutWrapper>
            <SidebarWrapper>
                <Sidebar />
            </SidebarWrapper>
            <RightWrapper>
                <HeaderWrapper>
                    <Header />
                </HeaderWrapper>
                <ContentWrapper>
                    <Content
                        title={title}
                        elements={elements}
                        isCentered={isCentered}
                    >
                        {children}
                    </Content>
                </ContentWrapper>
            </RightWrapper>
        </LayoutWrapper>
    );
}
