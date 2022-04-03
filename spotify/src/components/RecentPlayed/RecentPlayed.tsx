import { useEffect, useMemo, useState } from "react";
import { PlayerStatus } from "../../constants/player-status";
import { usePlayer } from "../../services/player";
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

  return (
    <div className={styles.main}>
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
  );
};
