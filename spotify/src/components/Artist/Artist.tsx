import { useContext, useEffect, useMemo, useState } from "react";
import { Palette } from "react-palette";
import { useParams } from "react-router-dom";
import { PlayerStatus } from "../../constants/player-status";
import { IAlbum } from "../../services/album";
import { usePlayer } from "../../services/player";
import {
  getArtistAlbums,
  getArtistTracks,
  getInfoAboutArtists,
  IArtistInfo,
} from "../../services/subscriptions";
import { ThemeContext } from "../../services/ThemeContext";
import { ITrack } from "../../services/track";
import { Albums } from "../Albums/Albums";
import { Banner } from "../Banner/Banner";
import { Button } from "../Button/Button";
import { MainPlayList } from "../MainPlayList/MainPlayList";
import { Title } from "../Title/Title";
import styles from "./Artist.module.css";

export const Artist = () => {
  const { playTrack, playerStatus, currentTrack, queue, replaceQueue } =
    usePlayer();
  const { theme } = useContext(ThemeContext);
  const params: { artistId: string } = useParams();
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [artist, setArtist] = useState<IArtistInfo>();
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [albumsLimit, setAlbumsLimit] = useState<number>(10);

  const loadArtist = async () => {
    try {
      const response = await getInfoAboutArtists(params.artistId);

      setArtist(response.artist);
    } catch (error) {
      console.error(error);
    }
  };

  const loadLibrary = async () => {
    try {
      const response = await getArtistTracks(params.artistId);
      setTracks(response);
    } catch (error) {
      console.error(error);
    }
  };

  const loadAlbums = async () => {
    const offset = albums.length;

    try {
      const response = await getArtistAlbums(
        params.artistId,
        offset,
        albumsLimit
      );

      setAlbums((albums) => albums.concat(response));
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
    loadArtist();
    loadLibrary();
  }, [params.artistId]);

  useEffect(() => {
    loadAlbums();
  }, [albumsLimit]);

  return artist ? (
    <div
      className={styles.main}
      style={{
        backgroundColor: theme.darkBckgColor,
      }}
    >
      <Palette src={artist.avatar}>
        {({ data }) => (
          <Banner
            bgColor={`linear-gradient(300deg, ${data.muted}, ${data.darkMuted})`}
          >
            <div className={styles.info}>
              <div className={styles.mainInfo}>
                <p className={styles.profile}>
                  <img src="/assets/img/verified.svg" alt="verified" />{" "}
                  <span>Verified Artist</span>
                </p>

                <h2>{artist.name}</h2>

                <p className={styles.subscriptions}>
                  <img src="/assets/img/headphone.svg" alt="headphone" />
                  <span>{artist.followers} monthly listeners</span>
                </p>

                <Button text={text} onClick={playPauseClick} />
              </div>

              <div className={styles.photo}>
                <img src={artist.avatar} alt={artist.name} />
              </div>
            </div>
          </Banner>
        )}
      </Palette>

      <div className={styles.general}>
        <Title textTitle="Top Tracks" onClick={() => {}} />

        <div className={styles.playlist}>
          <MainPlayList tracks={tracks} />
        </div>

        <Title
          textTitle="Albums"
          textButton="See All"
          onClick={() => {
            setAlbumsLimit(50);
          }}
        />
        <div className={styles.albums}>
          <Albums albums={albums} />
        </div>
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
        No artist...
      </p>
    </div>
  );
};
