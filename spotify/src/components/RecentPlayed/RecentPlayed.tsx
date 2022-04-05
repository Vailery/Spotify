import { useContext, useEffect, useMemo, useState } from "react";
import { PlayerStatus } from "../../constants/player-status";
import { usePlayer } from "../../services/player";
import { ThemeContext } from "../../services/ThemeContext";
import { ITrack } from "../../services/track";
import { MainPlayList } from "../MainPlayList/MainPlayList";
import { Title } from "../Title/Title";
import styles from "./RecentPlayed.module.css";

export const RecentPlayed = () => {
  const {
    playTrack,
    playerStatus,
    currentTrack,
    queue,
    replaceQueue,
    recentQueue,
    timeRecentQueue,
  } = usePlayer();
  const { theme } = useContext(ThemeContext);
  const [tracks, setTracks] = useState<ITrack[]>([]);

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
    setTracks(recentQueue);
  }, [recentQueue]);

  return recentQueue.length !== 0 ? (
    <div
      className={styles.main}
      style={{
        backgroundColor: theme.darkBckgColor,
      }}
    >
      <Title
        textTitle="Recent Played"
        textButton={text}
        onClick={() => {
          playPauseClick();
        }}
      />

      <div className={styles.playlist}>
        <MainPlayList tracks={tracks} time={timeRecentQueue} />
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
        No tracks...
      </p>
    </div>
  );
};
