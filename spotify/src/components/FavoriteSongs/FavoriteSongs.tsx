import { useEffect, useMemo, useState } from "react";
import { PlayerStatus } from "../../constants/player-status";
import { usePlayer } from "../../services/player";
import { ITrack } from "../../services/track";
import { getUserTracksLibrary } from "../../services/userPlaylist";
import { MainPlayList } from "../MainPlayList/MainPlayList";
import { Title } from "../Title/Title";
import styles from "./FavoriteSongs.module.css";

export const FavoriteSongs = () => {
  const { playTrack, playerStatus, currentTrack, queue, replaceQueue } =
    usePlayer();
  const [tracks, setTracks] = useState<ITrack[]>([]);

  const loadLibrary = async () => {
    const offset = tracks.length;

    try {
      const response = await getUserTracksLibrary(offset);

      setTracks((tracks) => tracks.concat(response));
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
    loadLibrary();
  }, []);

  return (
    <div className={styles.main}>
      <Title
        textTitle="Favorite Songs"
        textButton={text}
        onClick={() => {
          playPauseClick();
        }}
      />

      <div className={styles.playlist}>
        <MainPlayList tracks={tracks} />
      </div>
    </div>
  );
};
