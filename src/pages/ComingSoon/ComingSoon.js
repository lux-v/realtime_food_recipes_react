import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { GrayTextStyle, RedTextStyle } from '../Landing/LandingStyle';

import Button from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';

import Content from '../../components/Layout/Content/Content';

const ComingSoonContent = () => {
    const navigate = useNavigate()
    return (
        <div style={{
            height: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
        }}>
            <RedTextStyle>
                COMING SOON
            </RedTextStyle>
            <GrayTextStyle>
                This page is under construction...
            </GrayTextStyle>
            <Button width="250px" callback={() => navigate(-1)}>
                Go back
            </Button>
        </div >
    )
}

function ComingSoon({ title }) {
    const { isLoggedIn } = useContext(AuthContext)


    return (
        <>
            {isLoggedIn ?
                <Layout
                    title={title}
                >
                    <ComingSoonContent />
                </Layout >
                : <Content title={title}>
                    <ComingSoonContent />
                </Content>
            }
        </>
    );
}

export default ComingSoon;
