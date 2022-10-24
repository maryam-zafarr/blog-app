import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import NewPost from "./pages/Posts/NewPost";
import EditPost from "./pages/Posts/EditPost";
import SinglePost from "./pages/Posts/SinglePost";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
