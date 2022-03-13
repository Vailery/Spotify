import { Redirect } from "react-router-dom";
import { checkIsLogged, getSpotifyAuthURL } from "../services/authentication";
import styles from "./Login.module.css";

const loginURL = getSpotifyAuthURL();

export const Login = () => {
  return checkIsLogged() ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <div className={styles.login}>
      <img
        className={styles.logo}
        src="/assets/img/spotify_logo.png"
        alt="logo"
      />
      <a href={loginURL} className={styles.link}>
        Login
      </a>
    </div>
  );
};
