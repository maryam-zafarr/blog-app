import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { logout, selectUser } from "../../store/userSlice";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const loggedInNav = (
    <ul>
      <li>{user && `Hello ${user.username}`}</li>
      <li>
        <Link to="/" className={classes.navLink}>
          Home
        </Link>
      </li>
      <li>
        <Link to="" onClick={logoutHandler} className={classes.navLink}>
          Logout
        </Link>
      </li>
    </ul>
  );

  const loggedOutNav = (
    <ul>
      <li>
        <NavLink to="/login" className={classes.navLink}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/signup" className={classes.navLink}>
          Register
        </NavLink>
      </li>
    </ul>
  );

  return (
    <header className={classes.header}>
      <div className={classes.logo}>V A N I T Y</div>
      <nav>{user ? loggedInNav : loggedOutNav}</nav>
    </header>
  );
};

export default Navigation;
