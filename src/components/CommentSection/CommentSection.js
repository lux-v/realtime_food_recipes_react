import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { getUserData } from "../../api/users";
import { putRecipeData } from "../../api/recipes";
import { AuthContext } from "../../context/AuthContext";
import useCheckImage from "../../hooks/useCheckImage";

import {
  CommentIconWrapper,
  CommentInputWrapper,
  CommentSectionWrapper,
  CommentsLabel,
  NewCommentWrapper,
  SendIcon,
} from "./CommentSectionStyles";

import { ErrorMesagge, TextArea, FormRow } from "../../lib/style/generalStyles";
import { ProfileImg } from "../../components/Layout/Header/HeaderStyle";
import profileImg from "../../assets/img/profile.svg";

import DeleteCommentModal from "../../components/Modal/Modal";
import CommentCard from "./CommentCard";

import { firestore } from "../../api/firebase";

const commentByDisplayName = async (commentById) => {
  const userData = await getUserData(commentById).then((res) => {
    console.log("res: ", res);
    return [res];
  });

  return userData?.displayName || "-";
};

const CommentSection = React.forwardRef(({ recipe, setRecipe }, ref) => {
  const { userData, setToastType } = useContext(AuthContext);
  const profileImgSrc = useCheckImage(userData?.photoURL, profileImg);
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState(false);

  const handleDeleteCommentModal = (commentId) => {
    return () => {
      setIsDeleteCommentModalOpen(true);
      setDeleteCommentId(commentId);
    };
  };

  const handleDeleteComment = async () => {
    const recipeComments = recipe?.comments || [];

    const filteredComments = recipeComments.filter(
      (comment) => comment.id !== deleteCommentId
    );

    const formattedData = filteredComments.map((comment) => {
      return {
        id: comment.id,
        commentBy: comment.commentBy,
        comment: comment.comment,
        createdAt: comment.createdAt,
      };
    });

    try {
      await putRecipeData({ comments: formattedData }, recipe.id).then(() => {
        setRecipe((prev) => ({
          ...prev,
          comments: formattedData,
        }));
      });

      setToastType({
        open: true,
        message: "Comment deleted successfully",
        type: "success",
      });
    } catch (error) {
      setToastType({
        open: true,
        message: "Error deleting comment",
        type: "error",
      });
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          comment: "",
        }}
        validationSchema={Yup.object({
          comment: Yup.string().required("Comment cannot be empty"),
        })}
        onSubmit={async (values, actions) => {
          let recipeComments = recipe?.comments || [];

          recipeComments.push({
            id: Date.now(),
            commentBy: userData?.uid,
            comment: values.comment,
            createdAt: firestore.Timestamp.fromDate(new Date()),
          });

          console.log("recipeComments: ", recipeComments);

          console.log("date: ", Date.now());
          console.log("new date: ", new Date(Date.now()).toLocaleString());
          console.log("newDate ", new Date());

          try {
            await putRecipeData({ comments: recipeComments }, recipe.id).then(
              () => {
                setRecipe((prev) => ({
                  ...prev,
                  comments: recipeComments,
                }));
              }
            );

            setToastType({
              open: true,
              message: "Comment added successfully",
              type: "success",
            });

            actions.resetForm();
          } catch (error) {
            setToastType({
              open: true,
              message: error,
              type: "error",
            });
            console.log("error:", error);
          }
        }}
      >
        {(formik) => (
          <CommentSectionWrapper ref={ref}>
            <CommentsLabel>Comments</CommentsLabel>
            {!recipe?.comments?.length > 0 && (
              <p style={{ padding: "30px 0" }}>
                There are no comments yet. Be the first one to comment.
              </p>
            )}

            <NewCommentWrapper>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <ProfileImg src={profileImgSrc} alt="profileImg" />
                <div>
                  <p style={{ fontSize: "0.9rem" }}>
                    {userData?.displayName || "-"}
                  </p>
                </div>
              </div>

              <FormRow style={{ width: "100%", marginBottom: "0" }}>
                <CommentInputWrapper>
                  <TextArea
                    placeholder="Write a comment..."
                    name="comment"
                    error={formik.errors.comment && formik.touched.comment}
                    width="100%"
                  />
                  <CommentIconWrapper onClick={() => formik.handleSubmit()}>
                    <SendIcon />
                  </CommentIconWrapper>
                </CommentInputWrapper>
                <ErrorMesagge name="comment" component="div" />
              </FormRow>
            </NewCommentWrapper>
          </CommentSectionWrapper>
        )}
      </Formik>

      {recipe?.comments?.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
            borderRadius: "8px",
            gap: "10px",
          }}
        >
          {recipe?.comments?.map((comment, index) => {
            return (
              <CommentCard
                key={index}
                comment={comment}
                recipe={recipe}
                handleDeleteCommentModal={handleDeleteCommentModal}
              />
            );
          })}
        </div>
      )}

      <DeleteCommentModal
        isOpen={isDeleteCommentModalOpen}
        closeModal={() => setIsDeleteCommentModalOpen(false)}
        title="Delete comment"
        actionCallback={() =>
          handleDeleteComment().then(() => {
            setIsDeleteCommentModalOpen(false);
            setDeleteCommentId(null);
          })
        }
        actionText="Delete"
        isAlert
      >
        <p>Are you sure you want to delete this comment?</p>
      </DeleteCommentModal>
    </>
  );
});

export default CommentSection;
