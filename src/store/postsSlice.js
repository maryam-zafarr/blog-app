import { createSlice } from "@reduxjs/toolkit";
import { addPost, getAllPosts } from "./api";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePost: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find((post) => post.id === Number(id));
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    deletePost: (state, action) => {
      const { id } = action.payload;
      const existingPost = state.posts.find((post) => post.id === Number(id));
      if (existingPost) {
        state.posts = state.posts.filter(function (existingPost) {
          return existingPost.id !== Number(id);
        });
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        const { title, body, userId } = action.payload;
        let newId = state.posts[state.posts.length - 1].id;
        state.posts.push({ id: newId + 1, title, body, userId });
      });
  },
});

export const { updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
