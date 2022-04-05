import { useHistory } from "react-router-dom";
import { usePlayer } from "../../../services/player";
import { ITrack } from "../../../services/track";
import styles from "./PlayerDetails.module.css";

interface IProps {
  artist: string;
  cover: string;
  title: string;
  track: ITrack;
}

export const PlayerDetails = ({ artist, cover, title, track }: IProps) => {
  const { favoriteTracks, removeTrack, addTrack, currentAlbum } = usePlayer();
  const history = useHistory();

  const isInFavorite = favoriteTracks.some((item) => item.id === track.id);

  return (
    <div className={styles.main}>
      <img
        src={cover ? cover : currentAlbum?.cover}
        alt="cover"
        className={styles.cover}
      />

      <div className={styles.details}>
        <p className={styles.title}>{title}</p>
        <p
          className={styles.artist}
          onClick={() => {
            history.push("/application/artist/" + track.artists[0].id);
          }}
        >
          {artist}
        </p>
      </div>

      <img
        className={`${styles.like} ${isInFavorite ? styles.active : {}}`}
        src="/assets/img/like.svg"
        alt="like"
        onClick={() => {
          isInFavorite ? removeTrack(track.id) : addTrack(track.id, track);
        }}
      />
    </div>
  );
};
