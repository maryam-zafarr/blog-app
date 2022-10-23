import { createAsyncThunk } from "@reduxjs/toolkit";

const DOMAIN = "https://jsonplaceholder.typicode.com";

// GET all posts
export const getAllPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await fetch(`${DOMAIN}/posts`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch posts.");
  }

  const posts = [];

  for (const key in data) {
    const post = {
      id: key,
      ...data[key],
    };
    posts.push(post);
  }

  return posts;
});

// POST new post
export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
  const response = await fetch(`${DOMAIN}/posts/`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create post.");
  }

  return data;
});

// POST new comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async (commentData) => {
    const response = await fetch(`${DOMAIN}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not create post.");
    }

    return data;
  }
);

// GET all comments
export const fetchCommentsByPost = createAsyncThunk(
  "comments/getComments",
  async (postId) => {
    const response = await fetch(`${DOMAIN}/posts/${postId}/comments`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not fetch posts.");
    }

    const comments = [];

    for (const key in data) {
      const comment = {
        id: key,
        ...data[key],
      };
      comments.push(comment);
    }

    return comments;
  }
);
