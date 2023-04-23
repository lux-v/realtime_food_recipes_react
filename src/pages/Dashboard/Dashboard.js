import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button.js'
import Layout from '../../components/Layout/Layout.js'


import { AuthContext } from '../../context/AuthContext.js'

const Dashboard = () => {
    const navigate = useNavigate()



    return (
        <Layout
            title="Dashboard"
        >

        </Layout>
    )
}

export default Dashboard