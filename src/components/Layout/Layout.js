import React from 'react';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';

import {
    LayoutWrapper,
} from './LayoutStyle';


export default function Layout({
    title,
    isCentered = false,
    elements,
    children,
}) {

    return (
        <LayoutWrapper>
            <Header />
            <Sidebar />
            <Content
                title={title}
                elements={elements}
                isCentered={isCentered}
            >
                {children}
            </Content>
        </LayoutWrapper>
    );
}
