import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button.js'


import { AuthContext } from '../../context/AuthContext.js'

const Landing = () => {
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
        <Button
            callback={handleSignOut}
        >
            Sign out
        </Button>
    )
}

export default Landing