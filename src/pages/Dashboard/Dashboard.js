import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.js'
import { getAllRecipesData } from '../../api/recipes.js'

//components
import Button from '../../components/Button/Button.js'
import Layout from '../../components/Layout/Layout.js'
import StatsCard from '../../components/StatsCard/StatsCard.js'
//icons
import { ReactComponent as DoubleTicks } from '../../assets/icons/double-tick.svg'
import { ReactComponent as RecipesIcon } from '../../assets/icons/recipes-icon.svg'
import RecipeCard from '../../components/RecipeCard/RecipeCard.js'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.js'
import { StatsCardWrapper } from './DashboardStyle.js'
import MostPopularRecipe from '../../components/MostPopularRecipe/MostPopularRecipe.js'




const Dashboard = () => {
    const navigate = useNavigate();
    const { setToastType, userData } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [totalRecipes, setTotalRecipes] = useState(0);
    const [myRecipesNumber, setMyRecipesNumber] = useState(0);
    const [mostLikedRecipe, setMostLikedRecipe] = useState(null);
    const [myMostLikedRecipe, setMyMostLikedRecipe] = useState(null);


    const fetchRecipes = async () => {
        try {
            const recipesData = await getAllRecipesData();

            const totalRecipes = recipesData.length;
            const mostLikedRecipe = recipesData.sort((a, b) => b?.likedBy?.length - a?.likedBy?.length)[0];

            setTotalRecipes(totalRecipes);
            setMostLikedRecipe(mostLikedRecipe);

            setRecipes(recipesData);

        } catch (error) {
            setToastType({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    };

    useEffect(() => {
        setMyRecipesNumber(recipes.filter((recipe) => recipe.createdBy === userData?.uid).length);
        setMyMostLikedRecipe(recipes.filter((recipe) => recipe.createdBy === userData?.uid).sort((a, b) => b?.likedBy?.length - a?.likedBy?.length)[0]);
    }, [recipes, userData]);



    useEffect(() => {
        fetchRecipes(); // eslint-disable-next-line
    }, []);


    return (
        <Layout
            title="Dashboard"
        >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <StatsCardWrapper                >
                    <StatsCard
                        maxWidth="100%"
                        variant='primary-dark'
                        title="Total Recipes"
                        value={totalRecipes ?? 0}
                        icon={<RecipesIcon />}
                    />
                    <StatsCard
                        maxWidth="100%"
                        title="My Total Recipes"
                        value={myRecipesNumber}
                        icon={<RecipesIcon />}
                    />
                </StatsCardWrapper>
                <StatsCardWrapper>
                    {mostLikedRecipe ? (
                        <StatsCard maxWidth="100%" height="100%" value={`The most Popular Recipe - ${mostLikedRecipe.likedBy.length} likes`} variant='primary'>
                            <MostPopularRecipe
                                mostPopularRecipe={mostLikedRecipe}
                            />
                        </StatsCard>
                    )
                        : (
                            <StatsCard maxWidth="100%" height="auto" value="The most Popular Recipe" variant='primary-dark'>
                                <LoadingSpinner />
                            </StatsCard>
                        )
                    }
                    {myMostLikedRecipe ? (
                        <StatsCard
                            maxWidth="100%"
                            height="auto"
                            value={`My Most Popular Recipe - ${myMostLikedRecipe.likedBy.length} likes`}
                        >

                            <MostPopularRecipe
                                mostPopularRecipe={myMostLikedRecipe}
                            />
                        </StatsCard>
                    )
                        : (
                            <StatsCard maxWidth="100%" height="auto" value={myMostLikedRecipe !== undefined && "My Most Popular Recipe"} variant='primary-dark'>

                                {myMostLikedRecipe === undefined ?
                                    <>
                                        <p>You have no recipes yet</p>
                                        <Button
                                            callback={() => navigate("/recipes/add-new")}
                                        >
                                            Create Your First Recipe
                                        </Button>

                                    </>
                                    :
                                    <LoadingSpinner />}
                            </StatsCard>
                        )
                    }
                </StatsCardWrapper>



            </div>
        </Layout >
    )
}

export default Dashboard