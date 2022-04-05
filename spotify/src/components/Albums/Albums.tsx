import styles from "./Albums.module.css";
import { IAlbum } from "../../services/album";
import { Album } from "./Album";
import { useContext } from "react";
import { ThemeContext } from "../../services/ThemeContext";

interface IProps {
  albums: IAlbum[];
}

export const Albums = ({ albums }: IProps) => {
  const { theme } = useContext(ThemeContext);

  return albums.length !== 0 ? (
    <div className={styles.main}>
      {albums.map((item, index) => (
        <Album key={item.id + index} item={item} />
      ))}
    </div>
  ) : (
    <div className={styles.main}>
      <p
        className={styles.error}
        style={{
          color: theme.grayText,
        }}
      >
        No albums...
      </p>
    </div>
  );
};
