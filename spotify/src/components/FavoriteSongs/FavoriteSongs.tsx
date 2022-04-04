import { useEffect, useMemo, useState } from "react";
import { PlayerStatus } from "../../constants/player-status";
import { usePlayer } from "../../services/player";
import { ITrack } from "../../services/track";
import { getUserTracksLibrary } from "../../services/userPlaylist";
import { MainPlayList } from "../MainPlayList/MainPlayList";
import { Title } from "../Title/Title";
import styles from "./FavoriteSongs.module.css";

export const FavoriteSongs = () => {
  const {
    playTrack,
    playerStatus,
    currentTrack,
    queue,
    replaceQueue,
    favoriteTracks,
  } = usePlayer();

  const isTracksInQueue = useMemo(
    () =>
      favoriteTracks.every((track) =>
        queue?.some((value) => value.id === track.id)
      ) ?? false,
    [favoriteTracks, queue]
  );

  const playPauseClick = () => {
    if (!isTracksInQueue) {
      replaceQueue(favoriteTracks);
    }

    const newTracks = favoriteTracks.filter(
      (track) => track.sourceUrl !== null
    );
    const trackToPlay = isTracksInQueue ? currentTrack : newTracks[0];

    playTrack(trackToPlay!);
  };

  const text =
    !isTracksInQueue || playerStatus !== PlayerStatus.PLAYING
      ? "Play"
      : "Pause";

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
        <MainPlayList tracks={favoriteTracks} />
      </div>
    </div>
  );
};
