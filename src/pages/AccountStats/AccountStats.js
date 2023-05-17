import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

import Layout from '../../components/Layout/Layout'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'




const AccountStats = () => {
    const { userData, setToastType } = useContext(AuthContext)


    return (
        <Layout>
            <Card title="Account statistics">

            </Card >
        </Layout >
    )
}

export default AccountStats