import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { GrayTextStyle, RedTextStyle } from '../Landing/LandingStyle';

import Button from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';

import Content from '../../components/Layout/Content/Content';

const ComingSoonContent = () => {
    return (
        <div style={{
            height: "100%",
            textAlign: "center",
        }}>
            <RedTextStyle>
                COMING SOON
            </RedTextStyle>
            <GrayTextStyle>
                This page is under construction...
            </GrayTextStyle>
        </div >
    )
}

function ComingSoon({ title }) {
    const { isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate();

    return (
        <>
            {isLoggedIn ?
                <Layout
                    title={title || " "}
                    elements={
                        <>
                            <Button callback={() => navigate(-1)}>
                                Go back
                            </Button>
                        </>}
                >
                    <ComingSoonContent />
                </Layout >

                : <Content title={title || " "}>
                    <ComingSoonContent />
                </Content>
            }
        </>
    );
}

export default ComingSoon;
