import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectUser } from "../../store/userSlice";

const Navigation = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const loggedInNav = (
    <div>
      {user && <p>Hello {user.username}</p>}
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );

  const loggedOutNav = (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Register</Link>
    </div>
  );

  return <div>{user ? loggedInNav : loggedOutNav}</div>;
};

export default Navigation;
