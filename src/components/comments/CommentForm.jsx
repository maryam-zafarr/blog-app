import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../../store/api";
import { selectUser } from "../../store/userSlice";
import classes from "./CommentForm.module.css";
import { v4 as uuid } from "uuid";

const validate = (values) => {
  const errors = {};
  if (!values.body) {
    errors.body = "Required";
  }

  return errors;
};

const CommentForm = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const params = useParams();
  const { postId } = params;

  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  const formik = useFormik({
    initialValues: {
      commentId: small_id,
      body: "",
      userId: user.userId,
      email: user.email,
      postId: Number(postId),
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      dispatch(addComment(values));
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="body">Add Comment</label>
        <textarea
          id="body"
          name="body"
          type="text"
          rows="2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
        />
        {formik.touched.body && formik.errors.body && (
          <div>{formik.errors.body}</div>
        )}
      </div>

      <div className={classes.actions}>
        <button type="submit" className="btn btn-warning">
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
