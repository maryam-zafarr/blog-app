import React, { useState } from "react";
import CommentMeta from "./CommentMeta";
import classes from "./CommentItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { deleteComment } from "../../store/commentsSlice";
import { useHistory } from "react-router-dom";
import EditComment from "./EditComment";

const CommentItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  let isAuthorized = false;
  if (currentUser && currentUser.userId === String(props.userId)) {
    isAuthorized = true;
  }

  const editCommentHandler = () => {
    setIsEditing(true);
  };

  const changeEditingMode = () => {
    setIsEditing(false);
  };

  const deleteCommentHandler = (e) => {
    dispatch(deleteComment(props.id));
    history.replace(`/posts/${props.postId}`);
  };

  return (
    <div className={classes.listItemContainer}>
      {isAuthorized && isEditing ? (
        <EditComment id={props.id} editFormHandler={changeEditingMode} />
      ) : (
        <>
          <p>{props.body}</p>
          <CommentMeta author={props.email} />
        </>
      )}

      {isAuthorized && !isEditing ? (
        <div>
          <button onClick={editCommentHandler} className="btn btn-primary m-2">
            Edit
          </button>
          <button onClick={deleteCommentHandler} className="btn btn-danger m-2">
            Delete
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CommentItem;
