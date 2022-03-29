import { ITrack } from "../../services/track";
import styles from "./MainPlayList.module.css";

interface IProps {
  tracks: ITrack[];
}

export const MainPlayList = ({ tracks }: IProps) => {
  const duration = (ms: number) => {
    const date = new Date(ms);

    return `${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div className={styles.main}>
      {tracks.map((track, index) => (
        <div className={styles.mainTrack} key={track.id}>
          <div className={styles.track}>
            <div className={styles.mainInfo}>
              <div className={styles.playButton}>
                <p className={styles.number}>{index + 1}</p>

                <img
                  className={styles.play}
                  src="/assets/img/play.svg"
                  alt="play"
                />
              </div>

              <img
                className={styles.album}
                src={track.albumCover}
                alt="album"
              />

              <p className={styles.title}>{track.title}</p>
            </div>

            <div className={styles.info}>
              <p className={styles.artists}>
                {track.artists.map((item, index, array) => (
                  <span key={item.name}>
                    {index === array.length - 1
                      ? item.name
                      : item.name.concat(", ")}
                  </span>
                ))}
              </p>

              <img
                className={styles.clock}
                src="/assets/img/clock.svg"
                alt="clock"
              />

              <p className={styles.duration}>{duration(track.duration)}</p>

              <img
                className={styles.like}
                src="/assets/img/like.svg"
                alt="like"
              />

              <img
                className={styles.dots}
                src="/assets/img/dots.svg"
                alt="dots"
              />
            </div>
          </div>

          <p className={styles.border}></p>
        </div>
      ))}
    </div>
  );
};
