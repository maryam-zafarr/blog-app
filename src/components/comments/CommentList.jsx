import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByPost } from "../../store/api";
import CommentItem from "./CommentItem";

import classes from "./CommentList.module.css";

const CommentList = (props) => {
  const postId = Number(props.postId);
  const comments = useSelector((state) =>
    state.comments.comments.filter(
      (comment) => comment.postId === Number(postId)
    )
  );

  let transformedComments = comments.filter(
    (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsByPost(postId));
  }, [dispatch, postId]);

  return (
    <div className={classes.commentList}>
      <div>
        <h4 className="text-center">Comments</h4>
        {comments ? (
          transformedComments.map((comment) => {
            return (
              <CommentItem
                key={comment.id}
                id={comment.id}
                body={comment.body}
                email={comment.email}
                userId={comment.userId}
                postId={comment.postId}
              />
            );
          })
        ) : (
          <p>No comments to display.</p>
        )}
      </div>
    </div>
  );
};

export default CommentList;
