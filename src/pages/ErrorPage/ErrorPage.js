import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <Layout
            title='Error 404 - page not found'
            buttonText='Back'
            callback={() => navigate(-1)}
        />
    );
}

export default ErrorPage;
