import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CommentForm.module.css";
import { updateComment } from "../../store/commentsSlice";

const validate = (values) => {
  const errors = {};
  if (!values.body) {
    errors.body = "Required";
  }

  return errors;
};

const EditComment = (props) => {
  const dispatch = useDispatch();

  const comment = useSelector((state) =>
    state.comments.comments.find(
      (comment) => String(comment.id) === String(props.id)
    )
  );

  const formik = useFormik({
    initialValues: {
      id: props.id,
      body: comment === undefined ? "" : comment.body,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      dispatch(updateComment(values));
      props.editFormHandler();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <div className={classes.control}>
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
          Done
        </button>
      </div>
    </form>
  );
};

export default EditComment;
