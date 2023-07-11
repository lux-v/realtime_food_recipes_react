import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Content from '../../components/Layout/Content/Content';
import Layout from '../../components/Layout/Layout';
import { AuthContext } from '../../context/AuthContext';
import { GrayTextStyle, RedTextStyle } from '../Landing/LandingStyle';


const ErrorPageContent = () => {
    const navigate = useNavigate()
    return (
        <div style={{
            minHeight: "100%",

            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
        }}>
            <RedTextStyle>
                This page does not exist
            </RedTextStyle>
            <GrayTextStyle>
                It looks like you found a glitch in the matrix...
            </GrayTextStyle>
            <Button width="250px" callback={() => navigate("/")}>
                Go to home page
            </Button>
        </div>
    )
}


function ErrorPage() {
    const { isLoggedIn } = useContext(AuthContext)
    const title = 'Error 404 - page not found'

    return (
        <>
            {isLoggedIn ?
                <Layout
                    title={title}
                >
                    <ErrorPageContent />
                </Layout >
                : <Content title={title}>
                    <ErrorPageContent />
                </Content>
            }
        </>
    );
}

export default ErrorPage;
