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
export async function addComment(postId, commentData) {
  const response = await fetch(`${DOMAIN}/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name };
}

// GET all comments
export async function fetchCommentsByPost(postId) {
  const response = await fetch(`${DOMAIN}/posts/${postId}/comments`);
  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch comments.");
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
