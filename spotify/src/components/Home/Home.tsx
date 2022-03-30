import { useEffect, useMemo, useState } from "react";
import { usePalette } from "react-palette";
import { usePlayer } from "../../services/player";
import { ITrack } from "../../services/track";
import { IUserInfo } from "../../services/userApi";
import { getUserTracksLibrary } from "../../services/userPlaylist";
import { Banner } from "../Banner/Banner";
import { Button } from "../Button/Button";
import { MainPlayList } from "../MainPlayList/MainPlayList";
import { Title } from "../Title/Title";
import styles from "./Home.module.css";

interface IProps {
  user: IUserInfo;
}

export const Home = ({ user }: IProps) => {
  const { playTrack, playerStatus, currentTrack, queue, replaceQueue } =
    usePlayer();
  const { data } = usePalette(user.avatarUrl);
  const [tracks, setTracks] = useState<ITrack[]>([]);

  const loadLibrary = async () => {
    const offset = tracks.length;
    const limit = 4;

    try {
      const response = await getUserTracksLibrary(limit, offset);
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
      console.log(tracks);
    }

    const trackToPlay = isTracksInQueue ? currentTrack : tracks[0];
    playTrack(trackToPlay!);
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  return (
    <div className={styles.home}>
      <Banner
        bgColor={`linear-gradient(300deg, ${data.muted}, ${data.darkMuted})`}
      >
        <div className={styles.photo}>
          <img src={user.avatarUrl} alt="avatar" />
        </div>

        <div className={styles.mainInfo}>
          <p className={styles.profile}>
            <img src="/assets/img/premium.svg" alt="premium" />{" "}
            <span>Premium</span>
          </p>

          <h2>{user.name}</h2>

          <p className={styles.subscriptions}>
            <img src="/assets/img/headphone.svg" alt="headphone" />
            <span>n</span> subscriptions
          </p>

          <Button text="Play" onClick={playPauseClick} />
        </div>
      </Banner>

      <div className={styles.main}>
        <Title
          textTitle="Favorite Songs"
          textButton="See All"
          onClick={() => {}}
        />

        <div className={styles.playlist}>
          <MainPlayList tracks={tracks} />
        </div>
      </div>
    </div>
  );
};
