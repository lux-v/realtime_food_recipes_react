import React, { useContext, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import useCheckImage from '../../hooks/useCheckImage'
import { useRecipeLike } from '../../hooks/useRecipeLike'

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
    RecipeNameWrapper
} from './RecipeStyle'
import {
    AddFavorite,
    FavoriteIconWrapper
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
import { FacebookShareButton } from 'react-share'
import { useReactToPrint } from 'react-to-print'

const Recipe = () => {
    const navigate = useNavigate()
    const recipeId = useParams().id;
    const { userData } = useContext(AuthContext)
    const recipe = useFetchRecipe(recipeId)

    const { isLikedByUser, recipeLikes, handleLikeRecipe } = useRecipeLike(recipe, userData)
    const imageSrc = useCheckImage(recipe?.imgUrl || "", RecipeImagePlaceholder);
    const isOwner = useMemo(() => { return userData?.uid === recipe?.createdBy || userData?.isAdmin }, [recipe, userData])


    const componentRef = React.useRef();
    const handlePrint =  useReactToPrint({
        content: ()=> componentRef.current,
    })

    // if this would be used in more places, it should be moved to a hook
    // https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    // and saved in a context
    const isMobileDevice = useMemo( ()=> {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    },[])


    return (
        <Layout
            title="Recipe details"
        >
            {recipe ?
                <Card
                    ref={componentRef}
                    headingElements={[
                        <Button callback={() => navigate(`update`)} isHidden={!isOwner}>Edit </Button>,
                    ]}
                >
                    <RecipeWrapper>
                        <TopSideWrapper >
                            <LeftSideWrapper>
                                <RecipeNameWrapper>
                                    <TextContent fontSize="42px">
                                        {recipe.name}
                                    </TextContent>
                                    <RecipeLikesWrapper>
                                        <LikesNumber>
                                            {recipeLikes}
                                        </LikesNumber>
                                        <FavoriteIconWrapper>
                                            <AddFavorite onClick={(e) => handleLikeRecipe(e)} isfavorite={isLikedByUser} />
                                        </FavoriteIconWrapper>
                                    </RecipeLikesWrapper>
                                </RecipeNameWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Description
                                    </SectionHeadline>
                                    <TextContent>
                                        {recipe.description}
                                    </TextContent>
                                </SectionWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Cook time
                                    </SectionHeadline>
                                    <TextContent>
                                        {recipe.cookTimeMin} min
                                    </TextContent>
                                </SectionWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Ingredients
                                    </SectionHeadline>
                                    <IngredientsWrapper>
                                        {recipe && recipe?.ingredients && recipe?.ingredients.map((ingredient, index) =>
                                            <Chip size="medium" key={index} name={ingredient} />
                                        )}
                                    </IngredientsWrapper>
                                </SectionWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Share recipe
                                    </SectionHeadline>
                                    { !isMobileDevice &&
                                        <PrinterIcon style={{ cursor: "pointer" }} onClick={handlePrint} />
                                    }
                                 <FacebookShareButton    
                                        url={window.location.href}
                                        quote={recipe.name}
                                        hashtag="#recipes"
                                    >
                                        <FacebookIcon style={{ cursor: "pointer", stroke: "#2374E1" }} />
                                    </FacebookShareButton>
                                </SectionWrapper>
                            </LeftSideWrapper>
                            <RightSideWrapper>
                                <RecipeImg src={imageSrc} />
                            </RightSideWrapper>
                        </TopSideWrapper >

                        {recipe && recipe?.steps ?
                            <BottomSideWrapper>
                                {recipe?.steps.map((step, index) =>
                                    <SectionWrapper key={index}>
                                        <SectionHeadline secondary>
                                            Step {index + 1}
                                        </SectionHeadline>
                                        <TextContent secondary>
                                            {step}
                                        </TextContent>
                                    </SectionWrapper>
                                )}
                            </BottomSideWrapper>
                            : null}
                    </RecipeWrapper>
                </Card>
                :
                <LoadingSpinnerWrapper>
                    <LoadingSpinner size="120px" />
                </LoadingSpinnerWrapper>
            }
        </Layout >
    )
}

export default Recipe