import { PlayerStatus } from "../../../constants/player-status";
import { usePlayer } from "../../../services/player";
import styles from "./PlayerControls.module.css";

export const PlayerControls = () => {
  const {
    queue,
    currentTrack,
    playTrack,
    goToTrack,
    playerStatus,
    toggleRepeat,
    isRepeatActive,
    toggleShuffle,
    isShuffleActive,
  } = usePlayer();

  const PlayPauseClick = () => {
    if (queue.length === 0 || !currentTrack) {
      return;
    }

    playTrack(currentTrack ?? queue[0]);
  };

  const prevClick = () => {
    const currentIndex = queue.findIndex(
      (value) => value.id === currentTrack?.id
    );
    const prevIndex = Math.max(currentIndex - 1, 0);
    playTrack(queue[prevIndex]);
  };

  const nextClick = () => {
    const currentIndex = queue.findIndex(
      (value) => value.id === currentTrack?.id
    );
    if (currentIndex + 1 >= queue.length && isRepeatActive) {
      return playTrack(queue[0]);
    }

    const nextIndex = Math.min(currentIndex + 1, queue.length - 1);
    playTrack(queue[nextIndex]);
  };

  const restart = () => {
    goToTrack(0);
  };

  const PlayPauseButton =
    playerStatus === PlayerStatus.PLAYING
      ? "./assets/img/pause.svg"
      : "./assets/img/play-player.svg";

  return (
    <div className={styles.main}>
      <img
        className={`${styles.shuffle} ${
          isShuffleActive ? styles.active : styles.inactive
        }`}
        src="/assets/img/shuffle.svg"
        alt="shuffle"
        onClick={toggleShuffle}
      />

      <img
        className={styles.previous}
        src="/assets/img/previous.svg"
        alt="previous"
        onClick={restart}
        onDoubleClick={prevClick}
      />

      <div className={styles.controls} onClick={PlayPauseClick}>
        <img className={styles.pause} src={PlayPauseButton} alt="pause" />
      </div>

      <img
        className={styles.next}
        src="/assets/img/next.svg"
        alt="next"
        onClick={nextClick}
      />

      <img
        className={`${styles.repeat} ${
          isRepeatActive ? styles.active : styles.inactive
        }`}
        src="/assets/img/repeate.svg"
        alt="repeate"
        onClick={toggleRepeat}
      />
    </div>
  );
};
