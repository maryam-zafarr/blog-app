import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import { auth } from "../../firebase";

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
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      history.replace("/");
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
