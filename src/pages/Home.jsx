import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { login } from "../store/userSlice";

const Home = () => {
  const dispatch = useDispatch();

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

  return (
    <div>Home {/* {user ? <AuthorizedContent> : <UnauthorizedContent} */}</div>
  );
};

export default Home;
