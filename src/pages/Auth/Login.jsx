import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { auth } from "../../firebase";
import classes from "./Auth.module.css";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const Login = () => {
  const [error, setError] = useState(null);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        history.replace("/");
      } catch (error) {
        setError("Invalid credentials.");
      }
    },
  });
  return (
    <div className={classes.formContainer}>
      <form onSubmit={formik.handleSubmit} className={classes.authForm}>
        <div className={classes.authFormContent}>
          <h3 className={classes.authFormTitle}>Sign In</h3>
          <div className="form-group mt-3">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              className="form-control mt-1"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              className="form-control mt-1"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          {error && <p className="text-center">{error}</p>}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
