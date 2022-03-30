import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FavoriteSongs } from "../components/FavoriteSongs/FavoriteSongs";
import { Header } from "../components/Header/Header";
import { Home } from "../components/Home/Home";
import { LeftMenu } from "../components/LeftMenu/LeftMenu";
import { Loader } from "../components/Loader/Loader";
import { Player } from "../components/Player/Player";
import { RightMenu } from "../components/RightMenu/RightMenu";
import { PlayerProvider } from "../services/player";
import { getCurrentUser, IUserInfo } from "../services/userApi";
import styles from "./Application.module.css";

export const Application = () => {
  const [user, setUser] = useState<IUserInfo>();

  useEffect(() => {
    getCurrentUser()
      .then((user) => setUser(user))
      .catch((err) => console.error(err.message));
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
            </Switch>
          </div>
          <RightMenu user={user} />

          <Player />
        </PlayerProvider>
      </BrowserRouter>
    </div>
  ) : (
    <Loader />
  );
};
