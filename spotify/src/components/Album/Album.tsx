import { useContext, useEffect, useMemo, useState } from "react";
import { Palette } from "react-palette";
import { useHistory, useParams } from "react-router-dom";
import { PlayerStatus } from "../../constants/player-status";
import { usePlayer } from "../../services/player";
import { getAlbumTracks } from "../../services/subscriptions";
import { ThemeContext } from "../../services/ThemeContext";
import { ITrack } from "../../services/track";
import { Banner } from "../Banner/Banner";
import { Button } from "../Button/Button";
import { MainPlayList } from "../MainPlayList/MainPlayList";
import { Title } from "../Title/Title";
import styles from "./Album.module.css";

export const Album = () => {
  const {
    playTrack,
    playerStatus,
    currentTrack,
    queue,
    replaceQueue,
    loadAlbum,
    currentAlbum,
  } = usePlayer();
  const { theme } = useContext(ThemeContext);
  const params: { albumId: string } = useParams();
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const history = useHistory();

  const loadLibrary = async () => {
    try {
      const response = await getAlbumTracks(params.albumId);
      setTracks(response);
    } catch (error) {
      console.error(error);
    }
  };

  const isTracksInQueue = useMemo(
    () =>
      tracks.every((track) => queue?.some((value) => value.id === track.id)) ??
      false,
    [tracks, queue]
  );

  const playPauseClick = () => {
    if (!isTracksInQueue) {
      replaceQueue(tracks);
    }

    const newTracks = tracks.filter((track) => track.sourceUrl !== null);
    const trackToPlay = isTracksInQueue ? currentTrack : newTracks[0];

    playTrack(trackToPlay!);
  };

  const text =
    !isTracksInQueue || playerStatus !== PlayerStatus.PLAYING
      ? "Play"
      : "Pause";

  useEffect(() => {
    loadAlbum(params.albumId);
    loadLibrary();
  }, [params.albumId]);

  return currentAlbum ? (
    <div
      className={styles.main}
      style={{
        backgroundColor: theme.darkBckgColor,
      }}
    >
      <Palette src={currentAlbum.cover}>
        {({ data }) => {
          let date = new Date(currentAlbum.releaseDate);
          let releaseDate = `${date.getDate()} ${date.toLocaleString("en-us", {
            month: "short",
          })} ${date.getFullYear()}`;
          return (
            <Banner
              bgColor={`linear-gradient(300deg, ${data.muted}, ${data.darkMuted})`}
            >
              <div className={styles.info}>
                <div className={styles.mainInfo}>
                  <div className={styles.profile}>
                    {currentAlbum.artists.map((item, index, array) => (
                      <span
                        key={item.name}
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

                  <h2>{currentAlbum.name}</h2>

                  <p className={styles.release}>
                    <img src="/assets/img/recently.svg" alt="recently" />
                    <span>{releaseDate}</span> release date
                  </p>

                  <Button text={text} onClick={playPauseClick} />
                </div>

                <div className={styles.photo}>
                  <img src={currentAlbum.cover} alt={currentAlbum.name} />
                </div>
              </div>
            </Banner>
          );
        }}
      </Palette>

      <div className={styles.general}>
        <Title textTitle="Tracks" />

        <div className={styles.playlist}>
          <MainPlayList tracks={tracks} />
        </div>
      </div>
    </div>
  ) : (
    <div
      className={styles.main}
      style={{
        backgroundColor: theme.darkBckgColor,
      }}
    >
      <p
        className={styles.error}
        style={{
          color: theme.grayText,
        }}
      >
        No album...
      </p>
    </div>
  );
};
