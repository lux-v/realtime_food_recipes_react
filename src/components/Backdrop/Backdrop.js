import React from "react";
import { BackdropLoader, ContentWrapper, LoadingWrapper } from "./BackdropStyle";

const Backdrop = ({ children }) => {

    return (
        <LoadingWrapper>
            <BackdropLoader size="130px" />
            <ContentWrapper children={children}>
                {children && children}
            </ContentWrapper>
        </LoadingWrapper>
    )
}
export default Backdrop;