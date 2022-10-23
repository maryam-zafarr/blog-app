import React from "react";
import classes from "./CommentMeta.module.css";

const CommentMeta = (props) => {
  return (
    <div className={classes.metaContainer}>
      <div className={classes.metaItem}>
        <span>{props.author}</span>
      </div>
    </div>
  );
};

export default CommentMeta;
