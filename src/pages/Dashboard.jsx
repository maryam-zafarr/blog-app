import React from "react";
import CreatePostContainer from "../components/posts/CreatePostContainer";
import PostList from "../components/posts/PostList";

const Dashboard = () => {
  return (
    <div>
      <CreatePostContainer />
      <PostList />
    </div>
  );
};

export default Dashboard;
