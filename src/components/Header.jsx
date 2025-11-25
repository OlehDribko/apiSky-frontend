import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import styles from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const logoTarget = token ? "/posts" : "/login";

  return (
    <header className={styles.header}>
      <Link to={logoTarget} className={styles.logo}>
        ApiSky
      </Link>
      <nav className={styles.nav}>
        {token ? (
          <>
            <Link
              to="/posts"
              className={`${styles.link} ${
                isActive("/posts") ? styles.active : ""
              }`}
            >
              My posts
            </Link>
            <Link
              to="/posts/new"
              className={`${styles.link} ${
                isActive("/posts/new") ? styles.active : ""
              }`}
            >
              Create post
            </Link>
            <button onClick={handleLogout} className={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`${styles.link} ${
                isActive("/login") ? styles.active : ""
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`${styles.link} ${
                isActive("/register") ? styles.active : ""
              }`}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
