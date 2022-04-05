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
  const history = useHistory();

  const loadSearch = async () => {
    const offset = 0;
    const limit = 10;

    try {
      const response = await getSearchResult(search, offset, limit);
      setAlbums(() => response.albums);
      setArtists(() => response.artist);
      setTracks(() => response.tracks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search.length !== 0) {
      loadSearch();
    } else {
      history.push("/application/home");
    }
  }, [search]);

  return (
    <div className={styles.main}>
      <div className={styles.items}>
        <Title textTitle="Songs" textButton="See All" onClick={() => {}} />
        <div className={styles.item}>
          <MainPlayList tracks={tracks} />
        </div>

        <Title textTitle="Albums" textButton="See All" onClick={() => {}} />
        <div className={styles.item}>
          <Albums albums={albums} />
        </div>

        <Title textTitle="Performers" textButton="See All" onClick={() => {}} />
        <div className={styles.item}>
          <MainSubscriptions subscr={artists} />
        </div>
      </div>
    </div>
  );
};
