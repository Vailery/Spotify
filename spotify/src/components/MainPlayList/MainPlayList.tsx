import { useState } from "react";
import { usePlayer } from "../../services/player";
import { ITrack } from "../../services/track";
import { Details } from "./Details";
import styles from "./MainPlayList.module.css";

interface IProps {
  tracks: ITrack[];
}

export const MainPlayList = ({ tracks }: IProps) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const { queue, playTrack, currentTrack, replaceQueue } = usePlayer();
  console.log(tracks);

  const trackClick = (track: ITrack) => {
    const isAlbumInQueue = queue?.some((value) => value.id === track.id);

    if (!isAlbumInQueue) {
      replaceQueue(tracks);
    }

    playTrack(track);
  };

  const duration = (ms: number) => {
    const date = new Date(ms);

    return `${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div className={styles.main}>
      {tracks.map((track, index) => {
        const isActive = currentTrack?.id === track.id;
        const isSelected = selectedRowIndex === index;
        const isSong = track.sourceUrl === null;
        const icon = isActive
          ? "/assets/img/volume.svg"
          : "/assets/img/play.svg";

        return (
          <div className={styles.mainTrack} key={track.id}>
            <div
              className={`${styles.track} 
              ${isActive ? styles.active : styles.inactive} 
              ${isSelected ? styles.select : styles.unselect}
              ${isSong ? styles.nosong : styles.song}`}
              onClick={() => setSelectedRowIndex(index)}
            >
              <div className={styles.mainInfo}>
                <div className={styles.playButton}>
                  <p className={styles.number}>{index + 1}</p>

                  <img
                    className={styles.play}
                    src={icon}
                    alt="play"
                    onClick={() => {
                      trackClick(track);
                    }}
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

                <Details track={track} />
              </div>
            </div>

            <p className={styles.border}></p>
          </div>
        );
      })}
    </div>
  );
};
