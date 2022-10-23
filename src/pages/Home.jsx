import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { login, selectUser } from "../store/userSlice";
import Dashboard from "./Dashboard";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            userId: user.uid,
            email: user.email,
            username: user.displayName,
          })
        );
      }
    });
  }, [dispatch]);

  return <div>{user ? <Dashboard /> : <p>Log in to view content</p>}</div>;
};

export default Home;
