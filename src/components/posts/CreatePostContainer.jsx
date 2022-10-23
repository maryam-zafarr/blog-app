import React from "react";
import { Link } from "react-router-dom";
import classes from "./CreatePostContainer.module.css";

const CreatePostContainer = () => {
  return (
    <div className={classes.container}>
      <Link to="/new-post" className="btn btn-warning">
        Create Post
      </Link>
    </div>
  );
};

export default CreatePostContainer;
