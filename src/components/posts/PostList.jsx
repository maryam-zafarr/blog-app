import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/api";
import LoadingSpinner from "../ui/LoadingSpinner";
import PostItem from "./PostItem";

const PostList = (props) => {
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);

  const reversedPosts = [...posts].reverse();

  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(getAllPosts());
    }
  }, [postStatus, dispatch]);

  if (postStatus === "loading") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <ul>
        {posts &&
          reversedPosts.map((post) => {
            return (
              <PostItem
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.body}
                userId={post.userId}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default PostList;
