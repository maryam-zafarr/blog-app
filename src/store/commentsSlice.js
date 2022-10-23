import { createSlice } from "@reduxjs/toolkit";
import { addComment, fetchCommentsByPost } from "./api";

const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    updateComment: (state, action) => {
      const { id, body } = action.payload;
      const existingComment = state.comments.find(
        (comment) => String(comment.id) === String(id)
      );
      if (existingComment) {
        existingComment.body = body;
      }
    },
    deleteComment: (state, action) => {
      const id = action.payload;
      const existingComment = state.comments.find(
        (comment) => String(comment.id) === String(id)
      );

      if (existingComment) {
        state.comments = state.comments.filter(function (existingComment) {
          return String(existingComment.id) !== id;
        });
      }
    },
  },
  extraReducers(builder) {
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
        const { body, commentId, email, postId, userId } = action.payload;
        let newId = commentId;
        state.comments.push({ id: newId, body, userId, email, postId });
      });
  },
});

export const { updateComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
