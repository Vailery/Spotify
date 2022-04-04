import styles from "./Albums.module.css";
import { IAlbum } from "../../services/album";
import { Album } from "./Album";

interface IProps {
  albums: IAlbum[];
}

export const Albums = ({ albums }: IProps) => {
  return (
    <div className={styles.main}>
      {albums.map((item) => (
        <Album key={item.id} item={item} />
      ))}
    </div>
  );
};
