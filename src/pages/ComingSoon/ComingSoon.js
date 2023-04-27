import React from 'react';
import { useNavigate } from 'react-router-dom';

import { GrayTextStyle, RedTextStyle } from '../Landing/LandingStyle';

import Button from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';

function ComingSoon({ title }) {
    const navigate = useNavigate();

    return (
        <Layout
            title={title || " "}
            elements={
                <>
                    <Button callback={() => navigate(-1)}>
                        Go back
                    </Button>
                </>}
        >
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
        </Layout >
    );
}

export default ComingSoon;
