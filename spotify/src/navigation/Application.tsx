import { ReactNode, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Album } from "../components/Album/Album";
import { Artist } from "../components/Artist/Artist";
import { Error } from "../components/Error/Error";
import { SessionError } from "../components/Error/SessionError";
import { FavoriteSongs } from "../components/FavoriteSongs/FavoriteSongs";
import { Header } from "../components/Header/Header";
import { Home } from "../components/Home/Home";
import { LeftMenu } from "../components/LeftMenu/LeftMenu";
import { Loader } from "../components/Loader/Loader";
import { Player } from "../components/Player/Player";
import { RecentPlayed } from "../components/RecentPlayed/RecentPlayed";
import { RightMenu } from "../components/RightMenu/RightMenu";
import { Search } from "../components/Search/Search";
import { PlayerProvider } from "../services/player";
import { getCurrentUser, IUserInfo } from "../services/userApi";
import styles from "./Application.module.css";

export const Application = () => {
  const [user, setUser] = useState<IUserInfo>();
  const [error, setError] = useState<ReactNode>();
  const [search, setSearch] = useState("");

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
            <Header search={search} setSearch={setSearch} />
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
              <Route
                path="/application/recent_played"
                exact
                component={RecentPlayed}
              />
              <Route path="/application/search">
                <Search search={search} />
              </Route>
              <Route
                path="/application/artist/:artistId"
                exact
                component={Artist}
              />
              <Route
                path="/application/album/:albumId"
                exact
                component={Album}
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
