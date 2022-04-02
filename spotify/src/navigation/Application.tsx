// import { render } from "react";
import { ReactNode, useEffect, useState } from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { Error } from "../components/Error/Error";
import { SessionError } from "../components/Error/SessionError";
import { FavoriteSongs } from "../components/FavoriteSongs/FavoriteSongs";
import { Header } from "../components/Header/Header";
import { Home } from "../components/Home/Home";
import { LeftMenu } from "../components/LeftMenu/LeftMenu";
import { Loader } from "../components/Loader/Loader";
import { Player } from "../components/Player/Player";
import { RightMenu } from "../components/RightMenu/RightMenu";
import { clearSession } from "../services/authentication";
import { PlayerProvider } from "../services/player";
import { getCurrentUser, IUserInfo } from "../services/userApi";
import styles from "./Application.module.css";

export const Application = () => {
  const [user, setUser] = useState<IUserInfo>();
  const [error, setError] = useState<ReactNode>();

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.error(err);
        setUser(undefined);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError(<SessionError />);
    }, 5000);
  }, []);

  return user !== undefined ? (
    <div className={styles.app}>
      <BrowserRouter>
        <PlayerProvider>
          <LeftMenu />
          <div className={styles.main}>
            <Header />
            <Switch>
              <Route path="/application/" exact>
                <Home user={user} />
              </Route>
              <Route path="/application/home" exact>
                <Home user={user} />
              </Route>
              <Route
                path="/application/home/favorite_songs"
                exact
                component={FavoriteSongs}
              />
              <Route
                path="/application/favorite_songs"
                exact
                component={FavoriteSongs}
              />
              <Route path="*" component={Error} />
            </Switch>
          </div>
          <RightMenu user={user} />

          <Player />
        </PlayerProvider>
      </BrowserRouter>
    </div>
  ) : (
    <>
      <Loader />
      {error}
    </>
  );
};
