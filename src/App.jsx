import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LoadingSpinner from "./components/ui/LoadingSpinner";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./PrivateRoute";

const Login = React.lazy(() => import("./pages/Auth/Login"));
const Signup = React.lazy(() => import("./pages/Auth/Signup"));
const Home = React.lazy(() => import("./pages/Home"));
const NewPost = React.lazy(() => import("./pages/Posts/NewPost"));
const EditPost = React.lazy(() => import("./pages/Posts/EditPost"));
const SinglePost = React.lazy(() => import("./pages/Posts/SinglePost"));

const App = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <PrivateRoute path="/new-post">
            <NewPost />
          </PrivateRoute>
          <PrivateRoute path="/posts/:postId" exact>
            <SinglePost />
          </PrivateRoute>
          <PrivateRoute path="/posts/:postId/edit">
            <EditPost />
          </PrivateRoute>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
