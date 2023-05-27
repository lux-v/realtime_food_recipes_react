import React, { useContext, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import useCheckImage from '../../hooks/useCheckImage'
import { useRecipeLike } from '../../hooks/useRecipeLike'
import useFetchUser from '../../hooks/useFetchUser'

import {
    LeftSideWrapper,
    LoadingSpinnerWrapper,
    RecipeImg,
    SectionWrapper,
    TopSideWrapper,
    RightSideWrapper,
    SectionHeadline,
    TextContent,
    IngredientsWrapper,
    BottomSideWrapper,
    RecipeWrapper,
    RecipeLikesWrapper,
    LikesNumber,
    RecipeNameWrapper,
    RecipeName,
    RecipeSpan,
    RecipeDetailsWrapper,
    RecipeDetailItem,
    RecipeDescriptionWrapper,
    RecipeImgWrapper,
    LikeCommentButtonWrapper,
    SummaryAndImageWrapper,
    ButtonsAndDescriptionWrapper,
    IngredientsAndStepsWrapper
} from './RecipeNewStyle'
import {
    AddFavorite,
    CookTimeIcon,
    FavoriteIconWrapper,
    ServingsIcon
} from '../../components/RecipeCard/RecipeCardStyle'

import Layout from '../../components/Layout/Layout'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Button from '../../components/Button/Button';
import Chip from '../../components/Chip/Chip'

import RecipeImagePlaceholder from '../../assets/img/recipe-image-placeholder.png';
import useFetchRecipe from '../../hooks/useFetchRecipe'
import Card from '../../components/Card/Card'

import { ReactComponent as PrinterIcon } from '../../assets/icons/printer.svg'
import { ReactComponent as FacebookIcon } from '../../assets/icons/facebook.svg'
import { ReactComponent as TwitterIcon } from '../../assets/icons/twitter.svg'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { useReactToPrint } from 'react-to-print'
import { ProfileImg } from '../../components/Layout/Header/HeaderStyle'

import profileImg from '../../assets/img/profile.svg';
import { TwoInRow } from '../../lib/style/generalStyles'
import { CookTime } from '../../components/RecipeCard/RecipeCardStyle'
const RecipeNew = () => {
    const navigate = useNavigate()
    const recipeId = useParams().id;
    const { userData } = useContext(AuthContext)
    const recipe = useFetchRecipe(recipeId)
    const recipeOwnerDetails = useFetchUser(recipe)
    const componentRef = React.useRef();

    const { isLikedByUser, recipeLikes, handleLikeRecipe } = useRecipeLike(recipe, userData)
    const imageSrc = useCheckImage(recipe?.imgUrl || "", RecipeImagePlaceholder);
    const isOwner = useMemo(() => { return userData?.uid === recipe?.createdBy || userData?.isAdmin }, [recipe, userData])
    const isMobileDevice = localStorage.getItem("isMobileDevice") === "true"

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const profileImgSrc = useCheckImage(recipeOwnerDetails?.user?.photoURL, profileImg)

    const recipeDate = useMemo(() => {
        if (recipe?.createdAt === undefined && recipe?.updatedAt === undefined) return null
        const timestamp = recipe?.updatedAt ? recipe.updatedAt : recipe?.createdAt
        const date = new Date(timestamp.seconds * 1000)
        const day = date.getDate()
        const month = date.toLocaleString('default', { month: 'long' })
        const year = date.getFullYear()
        const recipeDateFormatted = `${day} ${month} ${year}`
        return recipeDateFormatted

    }, [recipe?.createdAt, recipe?.updatedAt])

    console.log("recipe", recipe)



  return (
    <Layout
        title="Recipe"
        >
        {recipe === null ? <LoadingSpinnerWrapper><LoadingSpinner /></LoadingSpinnerWrapper> :
        <>

        <TopSideWrapper>
            <SummaryAndImageWrapper>
                <LeftSideWrapper >
                    <div style={{ display: "flex", gap: "5px" , paddingBottom:"20px", alignItems:"center"}} >
                        <ProfileImg src={profileImgSrc} alt="profileImg" style={{width:"50px", height:"50px"}} />
                        <div>
                            <TextContent>
                                By <span style={{ fontWeight: "600" }}>{recipeOwnerDetails?.user?.displayName || "-"}</span>
                            </TextContent>
                            <p style={{ fontSize: "0.9rem" }}>
                                {recipe?.updatedAt ? `Last updated at: ${recipeDate}` : `Created at: ${recipeDate}`}
                            </p>
                        </div>
                    </div>
                    <RecipeNameWrapper >
                        <RecipeName>
                            {/* <RecipeSpan> */}
                                {recipe.name.split(" ").map((word, index) => {
                                    return <RecipeSpan key={index}>{word}</RecipeSpan>
                                })
                                }
                                {/* </RecipeSpan> */}
                            </RecipeName>
                    </RecipeNameWrapper>

                    <RecipeDetailsWrapper >
                        {recipe?.servings &&
                        <RecipeDetailItem >
                            <ServingsIcon />
                            <p className="summary-left-details-item-value">{recipe.servings} {recipe.servings >="1" ? "persons" : "person"}</p>
                        </RecipeDetailItem>
                        }
                        <RecipeDetailItem className="summary-left-details-item" style={{display:"flex", alignItems:"center"}}>
                            <CookTime  />
                            <p className="summary-left-details-item-value">{recipe.cookTimeMin} minutes</p>
                        </RecipeDetailItem>
                        <RecipeDetailItem className="summary-left-details-item" style={{display:"flex", alignItems:"center"}}>
                                            <LikesNumber>
                                                {recipeLikes}
                                            </LikesNumber>
                                            <FavoriteIconWrapper>
                                                <AddFavorite onClick={handleLikeRecipe} isfavorite={isLikedByUser} />
                                            </FavoriteIconWrapper>
                        </RecipeDetailItem>
                    </RecipeDetailsWrapper>

                    <RecipeDetailsWrapper>
                        {recipe?.category && 
                       <RecipeDetailItem>
                       <Chip size="medium" name={recipe.category} />
                       </RecipeDetailItem>
                    }
                    {recipe?.cuisine &&
                       <RecipeDetailItem>
                          <Chip size="medium" name={recipe.cuisine} />
                       </RecipeDetailItem>
                        }
                    </RecipeDetailsWrapper>
                </LeftSideWrapper>
    

                <RightSideWrapper >
                    <RecipeImgWrapper>
                    <RecipeImg src={imageSrc} />
                    </RecipeImgWrapper>
                    
                </RightSideWrapper>
            </SummaryAndImageWrapper>


                <ButtonsAndDescriptionWrapper>
                    <LeftSideWrapper style={{background:"white"}}>
                        <LikeCommentButtonWrapper>
                            <Button isSecondary={!isLikedByUser} callback={handleLikeRecipe} style={{marginBottom:"20px"}}>{isLikedByUser ? "Unsave" :"Save"}</Button>
                            <Button callback={()=>alert("TODO: comment recipe")} style={{marginBottom:"20px"}}>Comment</Button>
                        </LikeCommentButtonWrapper>

                    </LeftSideWrapper>

                        <RightSideWrapper style={{color:"white"}}>
                            <RecipeDescriptionWrapper>
                                <p>
                                    {recipe.description}
                                </p>
                            </RecipeDescriptionWrapper>
                        </RightSideWrapper>
                </ButtonsAndDescriptionWrapper>
 

        </TopSideWrapper>

        <BottomSideWrapper style={{background:"unset"}}>
            <IngredientsAndStepsWrapper>
                <LeftSideWrapper style={{ padding:"0"}}>
                    <SectionWrapper>
                        <SectionHeadline>Ingredients</SectionHeadline>
                        <IngredientsWrapper>
                                        {recipe && recipe?.ingredients && recipe?.ingredients.map((ingredient, index) =>
                                            <Chip size="medium" key={index} name={ingredient} style={{padding:"4px", height:"unset"}} />
                                        )}
                                    </IngredientsWrapper>
                    </SectionWrapper>
                </LeftSideWrapper>
                        
                <RightSideWrapper style={{color:"white"}}>
                    
                    {recipe?.steps?.length > 0 && 
                    <>
                        <SectionHeadline>Preperation</SectionHeadline>
                        {recipe?.steps?.map((step, index) => {
                            return(
                                <SectionWrapper key={index}>
                                    <SectionHeadline>Step {index + 1}</SectionHeadline>
                                    <TextContent>{step}</TextContent>
                                </SectionWrapper>
                            )
                        })}
                        </>
                    }
                </RightSideWrapper>
            </IngredientsAndStepsWrapper>
        </BottomSideWrapper>




            </>
        }

        </Layout>
  )
}

export default RecipeNew