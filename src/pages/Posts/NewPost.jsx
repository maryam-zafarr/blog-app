import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PostForm from "../../components/posts/PostForm";
import Card from "../../components/ui/Card";
import { addPost } from "../../store/api";

const NewPost = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const addPostHandler = (values) => {
    dispatch(addPost(values));
    history.push("/");
  };

  return (
    <Card>
      <h3 className="text-center">N E W &nbsp; P O S T</h3>
      <PostForm onSubmit={addPostHandler} type="new" />
    </Card>
  );
};

export default NewPost;
