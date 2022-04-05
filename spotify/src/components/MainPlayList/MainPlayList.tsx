import { useContext, useState } from "react";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import { usePlayer } from "../../services/player";
import { ThemeContext } from "../../services/ThemeContext";
import { ITrack } from "../../services/track";
import { Details } from "./Details";
import styles from "./MainPlayList.module.css";

interface IProps {
  tracks: ITrack[];
  time?: Date[];
}

export const MainPlayList = ({ tracks, time }: IProps) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const {
    queue,
    playTrack,
    currentTrack,
    replaceQueue,
    favoriteTracks,
    removeTrack,
    addTrack,
    currentAlbum,
  } = usePlayer();
  const { theme } = useContext(ThemeContext);
  const history = useHistory();

  const trackClick = (track: ITrack) => {
    const isAlbumInQueue = queue?.some((value) => value.id === track.id);

    if (!isAlbumInQueue) {
      replaceQueue(tracks);
    }

    playTrack(track);
  };

  const duration = (ms: number) => {
    const date = new Date(ms);
    const seconds = date.getSeconds();

    const sec = seconds.toString().length === 1 ? `${seconds}0` : seconds;

    return `${date.getMinutes()}:${sec}`;
  };

  return (
    <div className={styles.main}>
      {tracks.map((track, index) => {
        const isInFavorite = favoriteTracks.some(
          (item) => item.id === track.id
        );
        const isActive = currentTrack?.id === track.id;
        const isSelected = selectedRowIndex === index;
        const isSong = track.sourceUrl === null;
        const icon = isActive
          ? "/assets/img/played.svg"
          : "/assets/img/play.svg";

        return (
          <div className={styles.mainTrack} key={track.id + index}>
            <div
              className={`${styles.track} 
              ${isActive ? styles.active : styles.inactive} 
              ${isSelected ? styles.select : styles.unselect}`}
              onClick={() => setSelectedRowIndex(index)}
            >
              <div
                className={`${styles.mainInfo} 
              ${isSong ? styles.nosong : styles.song}`}
              >
                <div className={styles.playButton}>
                  <p
                    className={styles.number}
                    style={{
                      color: theme.lightText,
                    }}
                  >
                    {index + 1}
                  </p>

                  <img
                    className={styles.play}
                    src={icon}
                    alt="play"
                    onClick={() => {
                      trackClick(track);
                    }}
                    style={{
                      filter: theme.filter,
                    }}
                  />
                </div>

                <img
                  className={styles.album}
                  src={
                    track.albumCover ? track.albumCover : currentAlbum?.cover
                  }
                  alt="album"
                />

                <p
                  className={styles.title}
                  style={{
                    color: theme.lightText,
                  }}
                >
                  {track.title}
                </p>
              </div>

              <div className={styles.info}>
                <div
                  className={styles.artists}
                  style={{
                    color: theme.lightText,
                  }}
                >
                  {track.artists.map((item, index, array) => (
                    <span
                      key={item.name + index}
                      onClick={() => {
                        history.push("/application/artist/" + item.id);
                      }}
                    >
                      {index === array.length - 1
                        ? item.name
                        : item.name.concat(",")}
                    </span>
                  ))}
                </div>

                {time ? (
                  <Moment locale="en" fromNow>
                    {time[index]}
                  </Moment>
                ) : (
                  <></>
                )}

                <img
                  className={styles.clock}
                  src="/assets/img/clock.svg"
                  alt="clock"
                  style={{
                    filter: theme.filter,
                  }}
                />

                <p
                  className={styles.duration}
                  style={{
                    color: theme.lightText,
                  }}
                >
                  {duration(track.duration)}
                </p>

                <img
                  className={`${styles.like} ${
                    isInFavorite ? styles.active : {}
                  }`}
                  src="/assets/img/like.svg"
                  alt="like"
                  onClick={() => {
                    isInFavorite
                      ? removeTrack(track.id)
                      : addTrack(track.id, track);
                  }}
                />

                <Details track={track} albumCover={currentAlbum?.cover} />
              </div>
            </div>

            <p className={styles.border}></p>
          </div>
        );
      })}
    </div>
  );
};
