import React, { useContext, useEffect, useState } from "react";

import { TrashCan } from "../../lib/style/generalStyles";
import { ProfileImg } from "../../components/Layout/Header/HeaderStyle";
import profileImg from "../../assets/img/profile.svg";
import useCheckImage from "../../hooks/useCheckImage";
import { AuthContext } from "../../context/AuthContext";
import { getUserData } from "../../api/users";

const CommentCard = ({ comment, recipe, handleDeleteCommentModal }) => {
  const { userData } = useContext(AuthContext);
  const [commentBy, setCommentBy] = useState(null);

  const profileImgSrc = useCheckImage(comment.user?.photoURL, profileImg);

  const recipeCommentDate = (commentDate) => {
    if (commentDate === undefined) return null;
    const timestamp = commentDate;
    const date = new Date(timestamp.seconds * 1000);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const recipeDateFormatted = `${day} ${month} ${year}`;
    return recipeDateFormatted;
  };

  useEffect(() => {
    if (comment?.commentBy) {
      getUserData(comment.commentBy)
        .then((res) => {
          setCommentBy(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [comment]);

  console.log("comment: ", comment);
  console.log("commentBy: ", commentBy);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "100%",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        fontSize: "0.9rem",
      }}
    >
      <p>{comment.comment}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <>
            <ProfileImg
              src={commentBy?.photoURL || profileImgSrc}
              alt="profileImg"
              style={{ width: "20px", height: "20px" }}
            />
            <p style={{ fontSize: "1rem" }}>{commentBy?.displayName || "-"}</p>
          </>
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            gap: "15px",
          }}
        >
          <p style={{ fontSize: "0.7rem" }}>
            {recipeCommentDate(recipe.createdAt)}
          </p>
          {comment.commentBy === userData?.uid && (
            <TrashCan onClick={handleDeleteCommentModal(comment.id)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
