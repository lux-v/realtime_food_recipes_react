import React from 'react';
import { useNavigate } from 'react-router-dom';

import { GrayTextStyle, RedTextStyle } from '../Landing/LandingStyle';

import Button from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';

function ComingSoon() {
    const navigate = useNavigate();

    return (
        <Layout
            title="Coming Soon"
            elements={
                <>
                    <Button callback={() => navigate(-1)} width="250px">
                        Go back
                    </Button>
                </>}
        >
            <div style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}>
                <RedTextStyle>
                    COMING SOON
                </RedTextStyle>
                <GrayTextStyle>
                    This page is under construction...
                </GrayTextStyle>
            </div >
        </Layout >
    );
}

export default ComingSoon;
