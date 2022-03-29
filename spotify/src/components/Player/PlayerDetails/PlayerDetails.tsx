import styles from "./PlayerDetails.module.css";

interface IProps {
  artist: string;
  cover: string;
  title: string;
  isLiked: boolean;
}

export const PlayerDetails = ({ artist, cover, title, isLiked }: IProps) => {
  const likeIcon = isLiked
    ? "/assets/img/favotite.svg"
    : "/assets/img/like.svg";

  return (
    <div className={styles.main}>
      <img src={cover} alt="cover" className={styles.cover} />

      <div className={styles.details}>
        <p className={styles.title}>{title}</p>
        <p className={styles.artist}>{artist}</p>
      </div>

      <img className={styles.like} src={likeIcon} alt="like" />
    </div>
  );
};
