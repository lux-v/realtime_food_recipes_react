import React from 'react'
import { getUserData } from '../api/users'

const useFetchUser = (recipe) => {
    const [user, setUser] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        if (recipe?.createdBy) {
            setIsLoading(true)
            getUserData(recipe.createdBy)
                .then((res) => {
                    setUser(res)
                    setIsLoading(false)
                }
                )
                .catch((err) => {
                    console.log(err)
                    setIsLoading(false)
                }
                )
        }
    }, [recipe])

    return { user, isLoading }

}

export default useFetchUser;

