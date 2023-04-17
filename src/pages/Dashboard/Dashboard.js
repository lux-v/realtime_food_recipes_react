import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button.js'
import Layout from '../../components/Layout/Layout.js'


import { AuthContext } from '../../context/AuthContext.js'

const Dashboard = () => {
    const navigate = useNavigate()

    const { logout } = useContext(AuthContext)

    const handleSignOut = async () => {
        try {
            await logout()
            navigate("/login")

        }
        catch (err) {
        }
    }


    return (
        <Layout
            title="Title"
        >
            <Button
                callback={handleSignOut}
            >
                Sign out
            </Button>
        </Layout>
    )
}

export default Dashboard