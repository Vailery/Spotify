import { usePlayer } from "../../../services/player";
import styles from "./Lyrics.module.css";
import { useEffect, useRef, useState } from "react";
import { getSongLyrics } from "../../../services/songLyrics";

export const Lyrics = () => {
  const { currentTrack } = usePlayer();
  const lyricsRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [lyrics, setLyrics] = useState();
  const onClick = () => setIsActive(!isActive);

  const track = currentTrack?.title;
  const artist = currentTrack?.artists[0].name;

  const loadLyrics = async () => {
    try {
      const response = await getSongLyrics(track, artist);

      setLyrics(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLyrics();
  }, [currentTrack]);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (lyricsRef.current !== null && !lyricsRef.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  return (
    <div className={styles.main}>
      <img
        src="/assets/img/lirik.svg"
        alt="lirik"
        onClick={onClick}
        className={`${styles.lirik} ${isActive ? styles.active : {}}`}
      />

      <div
        ref={lyricsRef}
        className={`${styles.lyrics} ${isActive ? styles.active : {}}`}
      >
        {lyrics ? (
          <p dangerouslySetInnerHTML={{ __html: `${lyrics}` }} />
        ) : (
          <p>There are no lyrics to this track</p>
        )}
      </div>
    </div>
  );
};
