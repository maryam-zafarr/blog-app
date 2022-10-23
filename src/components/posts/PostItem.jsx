import React from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";

const PostItem = (props) => {
  return (
    <Card>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <Link to={`/posts/${props.id}`} className="btn btn-dark">
        View Post
      </Link>
    </Card>
  );
};

export default PostItem;
