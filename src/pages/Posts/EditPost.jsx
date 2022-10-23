import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PostForm from "../../components/posts/PostForm";
import Card from "../../components/ui/Card";
import { updatePost } from "../../store/postsSlice";

const EditPost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { postId } = params;

  const editPostHandler = (values) => {
    dispatch(
      updatePost({ id: postId, title: values.title, body: values.body })
    );
    history.push("/posts");
  };
  return (
    <Card>
      <h3 className="text-center">E D I T &nbsp; P O S T</h3>
      <PostForm onSubmit={editPostHandler} type="edit" />
    </Card>
  );
};

export default EditPost;
