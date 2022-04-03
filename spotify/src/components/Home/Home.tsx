import { useEffect, useMemo, useState } from "react";
import { usePalette } from "react-palette";
import { useHistory } from "react-router-dom";
import { PlayerStatus } from "../../constants/player-status";
import { usePlayer } from "../../services/player";
import { IArtistInfo } from "../../services/subscriptions";
import { ITrack } from "../../services/track";
import { IUserInfo } from "../../services/userApi";
import {
  getUserFollowedArtists,
  getUserTracksLibrary,
} from "../../services/userPlaylist";
import { Banner } from "../Banner/Banner";
import { Button } from "../Button/Button";
import { MainPlayList } from "../MainPlayList/MainPlayList";
import { MainSubscriptions } from "../MainSubscriptions/MainSubscriptions";
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
  const [subscriptions, setSubscriptions] = useState<IArtistInfo[]>([]);
  const [totalSubscr, setTotalSubscr] = useState<number>(0);
  const [subscLimit, setSubscLimit] = useState<number>(6);
  const history = useHistory();

  const loadLibrary = async () => {
    const offset = tracks.length;
    const limit = 4;

    try {
      const response = await getUserTracksLibrary(offset, limit);

      setTracks((tracks) => tracks.concat(response));
    } catch (error) {
      console.error(error);
    }
  };

  const loadArtists = async () => {
    try {
      const response = await getUserFollowedArtists(subscLimit);
      // console.log(response);

      setSubscriptions(() => response.artist);
      setTotalSubscr(response.total);
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

  useEffect(() => {
    loadArtists();
  }, [subscLimit]);

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
            <span>{totalSubscr}</span> subscriptions
          </p>

          <Button text={text} onClick={playPauseClick} />
        </div>
      </Banner>

      <div className={styles.main}>
        <Title
          textTitle="Favorite Songs"
          textButton="See All"
          onClick={() => {
            history.push("/application/home/favorite_songs");
          }}
        />

        <div className={styles.playlist}>
          <MainPlayList tracks={tracks} />
        </div>

        <Title
          textTitle="Subscriptions"
          textButton="See All"
          onClick={() => {
            setSubscLimit(50);
          }}
        />

        <div className={styles.subscr}>
          <MainSubscriptions subscr={subscriptions} />
        </div>
      </div>
    </div>
  );
};
