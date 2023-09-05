import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getAllRecipesData } from "../../api/recipes";

import Layout from "../../components/Layout/Layout";
import {
  LoadingSpinnerWrapper,
  RecipesWrapper,
  Filter as FilterIcon,
  FilterWrapper,
} from "./RecipesStyle";

import RecipeCard from "../../components/RecipeCard/RecipeCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { FieldArray, Formik } from "formik";
import {
  Form,
  SmallField,
  SearchBar,
  ErrorMesagge,
  ErrorMessageCustom,
  TwoInRow,
  SmallSelect,
  Option,
  FormRow,
} from "../../lib/style/generalStyles";
import { RecipeIngredientsWrapper } from "../RecipesAddNew/RecipesAddNewStyles";
import Chip from "../../components/Chip/Chip";
import { ReactComponent as CloseIcon } from "../../assets/img/x-icon.svg";
import Modal from "../../components/Modal/Modal";
import { SectionHeadline, SectionWrapper } from "../RecipeDetail/RecipeDetailStyle";
import {
  categoryOptions,
  cookingMethodOptions,
  cuisineOptions,
  dieateryRestrictionsOptions,
} from "../../lib/constants";

const FilterContent = ({ formikRef }) => {
  // I want to have an ability to filter by:
  // number of likes
  // cookTimeMin to cook
  // difficulty

  // likes should be a range option
  // cookTimeMin should be a range option
  // difficulty should be from 1 to 5

  setTimeout(() => {
    const input = document.getElementById("newIngredient");
    if (input) {
      input.focus();
    }
  }, 0);

  const [newIngredient, setNewIngredient] = useState("");
  const [newIngredientError, setNewIngredientError] = useState(false);

  const filterValues = JSON.parse(localStorage.getItem("filter"));

  const ingredientErrorLengthMessage =
    "New ingredient name must be less than 50 characters";
  const ingredientErrorRequiredMessage = "Ingredient cannot be empty";
  const ingredientUniqueErrorMessage = "This ingredient is already added";

  const handleKeyDown = (e, callback, formik) => {
    formik.handleBlur("ingredients");

    if (newIngredient !== "")
      if (newIngredient.length <= 50)
        if (!formik.values.ingredients.includes(newIngredient)) {
          if (e.key === "Enter" || e.keyCode === 13 || e.type === "click") {
            e.preventDefault();
            callback(newIngredient);
            setNewIngredient("");
            setNewIngredientError("");
          }
        } else {
          setNewIngredientError(ingredientUniqueErrorMessage);
        }
      else {
        setNewIngredientError(ingredientErrorLengthMessage);
      }
    else {
      setNewIngredientError(ingredientErrorRequiredMessage);
    }
  };

  const handleNewIngredientChange = (e, formik) => {
    formik.handleBlur("ingredients");
    const newValue = e.target.value;

    newValue === ""
      ? setNewIngredientError(ingredientErrorRequiredMessage)
      : newValue.length > 50
        ? setNewIngredientError(ingredientErrorLengthMessage)
        : formik.values.ingredients.includes(newValue)
          ? setNewIngredientError(ingredientUniqueErrorMessage)
          : setNewIngredientError("");

    setNewIngredient(newValue);
  };

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={{
        ingredients: filterValues?.ingredients || [],
        category: filterValues?.category || "All",
        dietaryRestrictions: filterValues?.dietaryRestrictions || "All",
        cuisine: filterValues?.cuisine || "All",
        cookingMethod: filterValues?.cookingMethod || "All",
        myRecipes: filterValues?.myRecipes || false,
      }}
      onSubmit={(values) => {
        localStorage.setItem("filter", JSON.stringify(values));
      }}
    >
      {(formik) => (
        <Form>
          <SectionWrapper>
            <SectionHeadline>Show only my recipes</SectionHeadline>
            <FormRow>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  id="myRecipes"
                  name="myRecipes"
                  type="checkbox"
                  checked={formik.values.myRecipes}
                  onChange={formik.handleChange}
                />
                <label htmlFor="myRecipes">Show only my recipes</label>
              </div>
            </FormRow>
          </SectionWrapper>
          <SectionWrapper>
            <FieldArray
              name="ingredients"
              render={(arrayHelpers) => (
                <>
                  <SectionWrapper>
                    <SectionHeadline>Filter by ingredients:</SectionHeadline>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        zIndex: "999",
                      }}
                    >
                      <SmallField
                        id="newIngredient"
                        name="newIngredient"
                        type="newIngredient"
                        placeholder="Add ingredient"
                        error={newIngredientError ? true : false}
                        disabled={formik.isSubmitting}
                        isSecondary
                        width="100%"
                        value={newIngredient}
                        onKeyDown={(e) =>
                          handleKeyDown(
                            e,
                            (newValue) => {
                              arrayHelpers.insert(
                                formik.values.ingredients.length - 1,
                                newValue
                              );
                            },
                            formik
                          )
                        }
                        onChange={(e) => handleNewIngredientChange(e, formik)}
                      />
                      <Button
                        type="button"
                        callback={(e) =>
                          handleKeyDown(
                            e,
                            (newValue) => {
                              arrayHelpers.insert(
                                formik.values.ingredients.length - 1,
                                newValue
                              );
                            },
                            formik
                          )
                        }
                        height="100%"
                      >
                        +
                      </Button>
                    </div>
                    <ErrorMessageCustom isError={newIngredientError}>
                      {newIngredientError}
                    </ErrorMessageCustom>
                    <ErrorMesagge component={"div"} name="ingredients" />
                  </SectionWrapper>
                  {formik.values.ingredients.length > 0 && (
                    <RecipeIngredientsWrapper>
                      {formik.values.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Chip
                            size="small"
                            name={ingredient}
                            icon={CloseIcon}
                            iconCallback={() => arrayHelpers.remove(index)}
                          />
                        </div>
                      ))}
                    </RecipeIngredientsWrapper>
                  )}
                </>
              )}
            />
          </SectionWrapper>
          <TwoInRow width="100%">
            <SectionWrapper>
              <SectionHeadline>Filter by Category</SectionHeadline>
              <SmallSelect
                id="category"
                name="category"
                error={formik.touched.category && formik.errors.category}
                disabled={formik.isSubmitting}
                isSecondary
                width="100%"
                onChange={(e) => {
                  formik.setFieldValue("category", e.target.value);
                }}
                value={formik.values.category}
              >
                <Option key={-2} value="All">
                  All
                </Option>
                <Option key={-1} value="Not defined">
                  Not defined
                </Option>
                {categoryOptions.map((category, index) => (
                  <Option key={index} value={category}>
                    {category}
                  </Option>
                ))}
              </SmallSelect>
              <ErrorMesagge component={"div"} name="category" />
            </SectionWrapper>
            <SectionWrapper>
              <SectionHeadline>Filter by Dietary Restrictions</SectionHeadline>
              <SmallSelect
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                error={
                  formik.touched.dietaryRestrictions &&
                  formik.errors.dietaryRestrictions
                }
                disabled={formik.isSubmitting}
                isSecondary
                width="100%"
                onChange={(e) => {
                  formik.setFieldValue("dietaryRestrictions", e.target.value);
                }}
                value={formik.values.dietaryRestrictions}
              // multiple
              >
                <Option key={-2} value="All">
                  All
                </Option>
                <Option key={-1} value="Not defined">
                  Not defined
                </Option>
                {dieateryRestrictionsOptions.map(
                  (dietaryRestriction, index) => (
                    <Option key={index} value={dietaryRestriction}>
                      {dietaryRestriction}
                    </Option>
                  )
                )}
              </SmallSelect>
              <ErrorMesagge component={"div"} name="dietaryRestrictions" />
            </SectionWrapper>
          </TwoInRow>
          <TwoInRow width="100%">
            <SectionWrapper>
              <SectionHeadline>Filter by Cooking method</SectionHeadline>
              <SmallSelect
                id="cookingMethod"
                name="cookingMethod"
                error={
                  formik.touched.cookingMethod && formik.errors.cookingMethod
                }
                disabled={formik.isSubmitting}
                isSecondary
                width="100%"
                onChange={(e) => {
                  formik.setFieldValue("cookingMethod", e.target.value);
                }}
                value={formik.values.cookingMethod}
              >
                <Option key={-2} value="All">
                  All
                </Option>
                <Option key={-1} value="Not defined">
                  Not defined
                </Option>
                {cookingMethodOptions.map((cookingMethod, index) => (
                  <Option key={index} value={cookingMethod}>
                    {cookingMethod}
                  </Option>
                ))}
              </SmallSelect>
              <ErrorMesagge component={"div"} name="cookingMethod" />
            </SectionWrapper>
            <SectionWrapper>
              <SectionHeadline>Filter by Cuisine</SectionHeadline>
              <SmallSelect
                id="cuisine"
                name="cuisine"
                error={formik.touched.cuisine && formik.errors.cuisine}
                disabled={formik.isSubmitting}
                isSecondary
                width="100%"
                onChange={(e) => {
                  formik.setFieldValue("cuisine", e.target.value);
                }}
                value={formik.values.cuisine}
              >
                <Option key={-2} value="All">
                  All
                </Option>
                <Option key={-1} value="Not defined">
                  Not defined
                </Option>
                {cuisineOptions.map((cuisine, index) => (
                  <Option key={index} value={cuisine}>
                    {cuisine}
                  </Option>
                ))}
              </SmallSelect>
              <ErrorMesagge component={"div"} name="cuisine" />
            </SectionWrapper>
          </TwoInRow>
        </Form>
      )}
    </Formik>
  );
};

const Recipes = () => {
  const navigate = useNavigate();
  const { userData, setToastType } = useContext(AuthContext);

  const [recipes, setRecipes] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [searchRecipe, setSearchRecipe] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const formikRef = useRef();

  // moze se odvojit u hook
  const fetchRecipes = async () => {
    try {
      const recipesData = await getAllRecipesData();
      setRecipes(recipesData);
      setFilteredRecipes(recipesData);
      setSearchRecipe(recipesData);
    } catch (error) {
      setToastType({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const handleSearchInput = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setSearchRecipe(filteredRecipes);
    }
    setSearchRecipe(
      filteredRecipes.filter(
        (recipes) =>
          recipes.name.toLowerCase().includes(searchValue) ||
          recipes.description.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleApplyFilter = () => {
    formikRef.current &&
      formikRef.current.submitForm().then(() => {
        handleFilterRecipes();
      });
  };

  const handleFilterRecipes = () => {
    try {
      const filterValues = JSON.parse(localStorage.getItem("filter"));

      if (filterValues && recipes) {
        const filtered = recipes.filter((recipe) => {
          return (
            (filterValues.myRecipes === false ||
              (filterValues.myRecipes === true &&
                recipe.createdBy === userData.uid)) &&
            (filterValues.category === "All" ||
              (!recipe.category && filterValues.category === "Not defined") ||
              (recipe.category === "" &&
                filterValues.category === "Not defined") ||
              (recipe.category &&
                recipe.category
                  .toLowerCase()
                  .includes(filterValues.category.toLowerCase()))) &&
            (filterValues.cuisine === "All" ||
              (!recipe.cuisine && filterValues.cuisine === "Not defined") ||
              (recipe.cuisine === "" &&
                filterValues.cuisine === "Not defined") ||
              (recipe.cuisine &&
                recipe.cuisine
                  .toLowerCase()
                  .includes(filterValues.cuisine.toLowerCase()))) &&
            (filterValues.cookingMethod === "All" ||
              (!recipe.cookingMethod &&
                filterValues.cookingMethod === "Not defined") ||
              (recipe.cookingMethod === "" &&
                filterValues.cookingMethod === "Not defined") ||
              (recipe.cookingMethod &&
                recipe.cookingMethod
                  .toLowerCase()
                  .includes(filterValues.cookingMethod.toLowerCase()))) &&
            (filterValues.dietaryRestrictions === "All" ||
              (!recipe.dietaryRestrictions &&
                filterValues.dietaryRestrictions === "Not defined") ||
              (recipe.dietaryRestrictions === "" &&
                filterValues.dietaryRestrictions === "Not defined") ||
              (recipe.dietaryRestrictions &&
                recipe.dietaryRestrictions
                  .toLowerCase()
                  .includes(filterValues.dietaryRestrictions.toLowerCase()))) &&
            filterValues.ingredients.every((ingredient) => {
              return recipe.ingredients.some((recipeIngredient) => {
                // Case-insensitive comparison
                return recipeIngredient
                  .toLowerCase()
                  .includes(ingredient.toLowerCase());
              });
            })
          );
        });
        setFilteredRecipes(filtered);
        setSearchRecipe(filtered);
      } else {
        setFilteredRecipes(recipes);
        setSearchRecipe(recipes);
      }
    } catch (error) {
      setToastType({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    handleFilterRecipes(); // eslint-disable-next-line
  }, [recipes]);

  useEffect(() => {
    fetchRecipes(); // eslint-disable-next-line
  }, []);

  return (
    <>
      <Layout title="Recipes">
        {searchRecipe ? (
          <Card
            headingElements={[
              <FilterWrapper onClick={handleFilterModal}>
                <FilterIcon />
                Filter
              </FilterWrapper>,
              <SearchBar
                placeholder="Search name or description"
                onChange={handleSearchInput}
              />,
            ]}
          >
            <div style={{ marginBottom: "25px" }}>
              <Button callback={() => navigate("/recipes/add-new")}>
                Add Recipe +
              </Button>
            </div>
            <RecipesWrapper>
              {searchRecipe.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <p>No recipes found</p>
                </div>
              ) : (
                searchRecipe.map((recipe) => {
                  return (
                    <RecipeCard
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                      key={recipe.id}
                      recipe={recipe}
                    />
                  );
                })
              )}
            </RecipesWrapper>
          </Card>
        ) : (
          <LoadingSpinnerWrapper>
            <LoadingSpinner size="120px" />
          </LoadingSpinnerWrapper>
        )}
      </Layout>

      <Modal
        isOpen={isFilterModalOpen}
        closeModal={() => setIsFilterModalOpen(false)}
        title="Filter recipes"
        actionCallback={handleApplyFilter}
        actionText="Apply"
      >
        <FilterContent formikRef={formikRef} />
      </Modal>
    </>
  );
};

export default Recipes;
