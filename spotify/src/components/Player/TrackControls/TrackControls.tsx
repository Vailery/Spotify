import { useEffect, useState } from "react";
import { usePlayer } from "../../../services/player";
import { InputRange } from "../../InutRange/InputRange";
import styles from "./TrackControls.module.css";

export const TrackControls = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [time, setTime] = useState(0);
  const { changeVolume, currentTrackDuration, getProgress, goToTrack } =
    usePlayer();

  const duration = (ms: number) => {
    const seconds = Math.round(ms) % 60;
    const minutes = Math.floor(ms / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`.split(".")[0];
  };

  const changeVolumeClick = (volume: number) => {
    changeVolume(volume / 100);
    setVolume(volume / 100);

    if (volume > 0) {
      setIsMuted(false);
    }

    if (volume === 0) {
      setIsMuted(true);
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const volumeIcon = isMuted
    ? "/assets/img/unvolume.svg"
    : "/assets/img/volume.svg";

  useEffect(() => {
    isMuted ? changeVolume(0) : changeVolume(volume);
  }, [isMuted, changeVolume, volume]);

  useEffect(() => {
    getProgress((progress) => setTime(progress));
  }, [getProgress]);

  return (
    <>
      <InputRange
        maxValue={currentTrackDuration}
        value={time}
        onChange={(value) => goToTrack(value)}
        styleName={styles.progressLine}
      />

      <div className={styles.main}>
        <p className={styles.duration}>
          {duration(time)} / {duration(currentTrackDuration)}
        </p>
        <img src={volumeIcon} alt="volume" onClick={toggleMute} />

        <InputRange
          maxValue={100}
          value={isMuted ? 0 : volume * 100}
          onChange={changeVolumeClick}
        />
        <img src="/assets/img/lirik.svg" alt="lirik" />
      </div>
    </>
  );
};
