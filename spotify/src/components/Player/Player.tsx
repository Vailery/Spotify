import { usePlayer } from "../../services/player";
import styles from "./Player.module.css";
import { PlayerDetails } from "./PlayerDetails/PlayerDetails";
import { PlayerControls } from "./PlayerControls/PlayerControls";
import { TrackControls } from "./TrackControls/TrackControls";

export const Player = () => {
  const { currentTrack } = usePlayer();
  console.log(currentTrack);

  return (
    <>
      {currentTrack ? (
        <div className={styles.player} id="player">
          <PlayerDetails
            artist={currentTrack.artists[0].name}
            cover={currentTrack.albumCover}
            title={currentTrack.title}
            track={currentTrack}
          />

          <PlayerControls />
          <TrackControls />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
