import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../store/userSlice";
import classes from "./PostForm.module.css";

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Required";
  }
  if (!values.body) {
    errors.body = "Required";
  }

  return errors;
};

const PostForm = (props) => {
  const params = useParams();
  const { postId } = params;

  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === Number(postId))
  );

  const user = useSelector(selectUser);

  const formik = useFormik({
    initialValues: {
      title: post === undefined ? "" : post.title,
      body: post === undefined ? "" : post.body,
      userId: user ? user.userId : "",
    },
    validate,
    onSubmit: (values) => {
      props.onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title && (
          <div>{formik.errors.title}</div>
        )}
      </div>

      <div className={classes.control}>
        <label htmlFor="body">Description</label>
        <textarea
          rows="5"
          id="body"
          name="body"
          type="textarea"
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
          {props.type === "new" ? "New Post" : "Edit Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
