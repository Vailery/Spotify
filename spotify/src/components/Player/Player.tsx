import { usePlayer } from "../../services/player";
import styles from "./Player.module.css";
import { PlayerDetails } from "./PlayerDetails/PlayerDetails";
import { PlayerControls } from "./PlayerControls/PlayerControls";
import { TrackControls } from "./TrackControls/TrackControls";

export const Player = () => {
  const { currentTrack } = usePlayer();

  return (
    <div className={styles.player}>
      {currentTrack ? (
        <PlayerDetails
          isLiked={false}
          artist={currentTrack.artists[0].name}
          cover={currentTrack.albumCover}
          title={currentTrack.title}
        />
      ) : (
        <></>
      )}

      <PlayerControls />
      <TrackControls />
    </div>
  );
};
