import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { getAllRecipesData } from '../../api/recipes'



import Layout from '../../components/Layout/Layout'
import { LoadingSpinnerWrapper, RecipesWrapper } from './RecipesStyle'
import { SearchBar } from "../../lib/style/generalStyles"

import RecipeCard from '../../components/RecipeCard/RecipeCard'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card'


const Recipes = () => {
    const navigate = useNavigate()

    const [recipes, setRecipes] = useState(null)
    const [filteredRecipes, setFilteredRecipes] = useState(null)
    const { setToastType } = useContext(AuthContext)


    // moze se odvojit u hook
    const fetchRecipes = async () => {
        try {
            const recipesData = await getAllRecipesData()
            setRecipes(recipesData)
            setFilteredRecipes(recipesData)

        } catch (error) {
            setToastType({
                open: true,
                message: error.message,
                type: 'error',
            });
        }
    }

    const handleSearchInput = (e) => {
        const searchValue = e.target.value.toLowerCase()
        if (searchValue === '') {
            setFilteredRecipes(recipes)
        }
        setFilteredRecipes(
            recipes.filter(
                (recipes) =>
                    recipes.name.toLowerCase().includes(searchValue) ||
                    recipes.description.toLowerCase().includes(searchValue)

            ),
        );
    };

    useEffect(() => {
        fetchRecipes()
    }, [])

    return (
        <Layout
            title="Recipes"
        >
            {filteredRecipes ?
                <Card title="Filter"
                    headingElements={[
                        <SearchBar
                            placeholder="Search name or description"
                            onChange={handleSearchInput}
                        />
                    ]}
                >
                    <div style={{ marginBottom: "25px" }}>
                        <Button callback={() => navigate("/recipes/add-new")}>Add new +</Button>
                    </div>
                    <RecipesWrapper>
                        {filteredRecipes.map(recipe => {
                            return <RecipeCard onClick={() => navigate(`/recipes/${recipe.id}`)} key={recipe.id} recipe={recipe} />
                        })}
                    </RecipesWrapper>
                </Card>
                :
                <LoadingSpinnerWrapper>
                    <LoadingSpinner size="120px" />
                </LoadingSpinnerWrapper>
            }
        </Layout>
    )
}

export default Recipes