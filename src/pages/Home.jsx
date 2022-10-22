import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navigation from "../components/Layout/Navigation";
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
    <div>
      <Navigation />
      {/* {user ? <AuthorizedContent> : <UnauthorizedContent} */}
    </div>
  );
};

export default Home;
