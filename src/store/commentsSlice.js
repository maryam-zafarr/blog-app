import { addComment, fetchCommentsByPost } from "./api";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    updateCommnent: () => {},
    deleteComment: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = state.comments.concat(action.payload);
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;
