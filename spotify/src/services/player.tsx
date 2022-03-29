import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { PlayerStatus } from "../constants/player-status";
import { ITrack } from "./track";

interface IProps {
  children: ReactNode;
}

interface IPlayerData {
  queue: ITrack[];
  currentTrack?: ITrack;
  playerStatus: PlayerStatus;
  currentTrackDuration: number;
  playTrack: (track: ITrack) => void;
  goToTrack: (time: number) => void;
  replaceQueue: (tracks: ITrack[]) => void;
}

const PlayerContext = createContext<IPlayerData>({} as IPlayerData);

export const PlayerProvider = ({ children }: IProps) => {
  const [queue, setQueue] = useState<ITrack[]>();
  const [currentTrack, setCurrentTrack] = useState<ITrack>();
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>(
    PlayerStatus.STOPPED
  );
  const [currentTrackDuration, setCurrentTrackDuration] = useState(0);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement>();

  const playTrack = useCallback(
    (track: ITrack) => {
      if (!currentTrack || currentTrack.id !== track.id) {
        audioElement?.pause();
        audioElement?.remove();
        return setCurrentTrack(track);
      }

      audioElement?.paused ? audioElement.play() : audioElement?.pause();
    },
    [audioElement, currentTrack]
  );

  const goToTrack = useCallback(
    (time: number) => {
      if (audioElement) {
        audioElement.currentTime = time;
      }
    },
    [audioElement]
  );

  const replaceQueue = useCallback((tracks: ITrack[]) => {
    setQueue(tracks);
  }, []);

  useEffect(() => {
    if (currentTrack) {
      const audio = new Audio(currentTrack.sourceUrl);
      setAudioElement(audio);
      setPlayerStatus(PlayerStatus.PLAYING);
      audio.play();
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioElement) {
      audioElement.onpause = () => setPlayerStatus(PlayerStatus.PAUSED);
      audioElement.onplay = () => setPlayerStatus(PlayerStatus.PLAYING);
      audioElement.onloadedmetadata = () =>
        setCurrentTrackDuration(audioElement.duration);
      audioElement.onended = () => {
        const trackQueue = queue;
        const nextTrackIndex = trackQueue?.findIndex(
          (value) => value.id === currentTrack?.id
        );
        const nextTrack = trackQueue![nextTrackIndex! + 1];
        if (!nextTrack) {
          return playTrack(trackQueue![0]);
        }

        if (nextTrack) {
          playTrack(nextTrack);
        }
      };
    }
  }, [audioElement, currentTrack, playTrack, queue]);

  return (
    <PlayerContext.Provider
      value={{
        queue: queue!,
        playTrack,
        currentTrack,
        playerStatus,
        goToTrack,
        currentTrackDuration,
        replaceQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
