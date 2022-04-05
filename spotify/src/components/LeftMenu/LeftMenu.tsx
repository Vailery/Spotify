import { useContext } from "react";
import { ThemeContext } from "../../services/ThemeContext";
import { LibraryList } from "../Menu/LibraryList";
import { Menu } from "../Menu/Menu";
import { MenuList } from "../Menu/MenuList";
import { PlayList } from "../Menu/PlayList";
import styles from "./LeftMenu.module.css";

export const LeftMenu = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.leftMenu}
      style={{
        background: theme.lightBckgColor,
      }}
    >
      <div className={styles.logo}>
        <img src="/assets/img/spotify_logo.png" alt="logo" />
      </div>

      <Menu list={MenuList} />
      <Menu title="Library" list={LibraryList} />
      <Menu title="Playlist" svg="/assets/img/plus.svg" list={PlayList} />
    </div>
  );
};
