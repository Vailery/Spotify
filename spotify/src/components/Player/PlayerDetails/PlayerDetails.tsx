import styles from "./PlayerDetails.module.css";

interface IProps {
  artist: string;
  cover: string;
  title: string;
  isLiked: boolean;
}

export const PlayerDetails = ({ artist, cover, title, isLiked }: IProps) => {
  return (
    <div className={styles.main}>
      <img src={cover} alt="cover" className={styles.cover} />

      <div className={styles.details}>
        <p className={styles.title}>{title}</p>
        <p className={styles.artist}>{artist}</p>
      </div>

      <img
        className={`${styles.like} ${
          isLiked ? styles.active : styles.inactive
        }`}
        src="/assets/img/like.svg"
        alt="like"
      />
    </div>
  );
};
