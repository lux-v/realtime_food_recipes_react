import { useState, useMemo } from 'react';
import { addRemoveLikedBy } from '../api/recipes';

export const useRecipeLike = (recipe, userData) => {
    const [isLikedByUser, setIsLikedByUser] = useState(false);
    const [recipeLikes, setRecipeLikes] = useState(0)

    useMemo(() => {
        setIsLikedByUser(recipe?.likedBy?.includes(userData.uid) || false);
        setRecipeLikes(recipe?.likedBy?.length || 0)
    }, [recipe?.likedBy, userData?.uid]);

    const handleLikeRecipe = async (e) => {
        e.stopPropagation();

        try {
            await addRemoveLikedBy(userData.uid, recipe.id, isLikedByUser);
            setIsLikedByUser(!isLikedByUser);
            setRecipeLikes((prev) => isLikedByUser ? prev - 1 : prev + 1)
        } catch (error) {
            console.log('error:', error);
        }
    };

    return { isLikedByUser, recipeLikes, handleLikeRecipe };
};