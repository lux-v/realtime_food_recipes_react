import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';
import Content from '../../components/Layout/Content/Content';
import { GrayTextStyle, RedTextStyle } from '../Landing/LandingStyle';


function ComingSoon() {
    const navigate = useNavigate();

    return (
        <Content>
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

                <Button callback={() => navigate(-1)} width="250px">
                    Go back
                </Button>

            </div >
        </Content >
    );
}

export default ComingSoon;
