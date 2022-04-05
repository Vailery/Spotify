import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IAlbum } from "../../services/album";
import { getSearchResult } from "../../services/search";
import { IArtistInfo } from "../../services/subscriptions";
import { ITrack } from "../../services/track";
import { Albums } from "../Albums/Albums";
import { MainPlayList } from "../MainPlayList/MainPlayList";
import { MainSubscriptions } from "../MainSubscriptions/MainSubscriptions";
import { Title } from "../Title/Title";
import styles from "./Search.module.css";

interface IProps {
  search: string;
}

export const Search = ({ search }: IProps) => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [artists, setArtists] = useState<IArtistInfo[]>([]);
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [loadSongsOffset, setLoadSongsOffset] = useState<number>(0);
  const [loadAlbumsOffset, setLoadAlbumsOffset] = useState<number>(0);
  const [loadArtistsOffset, setLoadArtistsOffset] = useState<number>(0);
  const history = useHistory();
  const limit = 5;

  const loadMoreSongs = async () => {
    try {
      const response = await getSearchResult(search, loadSongsOffset, limit);
      setTracks((tracks) => tracks.concat(response.tracks));
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreAlbums = async () => {
    try {
      const response = await getSearchResult(search, loadAlbumsOffset, limit);
      setAlbums((albums) => albums.concat(response.albums));
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreArtists = async () => {
    try {
      const response = await getSearchResult(search, loadArtistsOffset, limit);
      setArtists((artists) => artists.concat(response.artist));
    } catch (error) {
      console.error(error);
    }
  };

  const loadSongs = async () => {
    const offset = 0;

    try {
      const response = await getSearchResult(search, offset, limit);
      setTracks(() => response.tracks);
    } catch (error) {
      console.error(error);
    }
  };

  const loadAlbums = async () => {
    const offset = 0;

    try {
      const response = await getSearchResult(search, offset, limit);
      setAlbums(() => response.albums);
    } catch (error) {
      console.error(error);
    }
  };

  const loadArtists = async () => {
    const offset = 0;

    try {
      const response = await getSearchResult(search, offset, limit);
      setArtists(() => response.artist);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search.length !== 0) {
      loadMoreSongs();
    }
  }, [loadSongsOffset]);

  useEffect(() => {
    if (search.length !== 0) {
      loadMoreAlbums();
    }
  }, [loadAlbumsOffset]);

  useEffect(() => {
    if (search.length !== 0) {
      loadMoreArtists();
    }
  }, [loadArtistsOffset]);

  useEffect(() => {
    if (search.length !== 0) {
      loadSongs();
      loadAlbums();
      loadArtists();
    } else {
      history.push("/application/home");
    }
  }, [search]);

  return (
    <div className={styles.main}>
      <div className={styles.items}>
        <Title
          textTitle="Songs"
          textButton="See More"
          onClick={() => {
            setLoadSongsOffset(loadSongsOffset + limit);
          }}
        />
        <div className={styles.item}>
          <MainPlayList tracks={tracks} />
        </div>

        <Title
          textTitle="Albums"
          textButton="See More"
          onClick={() => {
            setLoadAlbumsOffset(loadAlbumsOffset + limit);
          }}
        />
        <div className={styles.item}>
          <Albums albums={albums} />
        </div>

        <Title
          textTitle="Performers"
          textButton="See More"
          onClick={() => {
            setLoadArtistsOffset(loadArtistsOffset + limit);
          }}
        />
        <div className={styles.item}>
          <MainSubscriptions subscr={artists} />
        </div>
      </div>
    </div>
  );
};
