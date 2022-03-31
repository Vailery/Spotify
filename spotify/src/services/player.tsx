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
  isShuffleActive: boolean;
  isRepeatActive: boolean;
  playTrack: (track: ITrack) => void;
  goToTrack: (time: number) => void;
  replaceQueue: (tracks: ITrack[]) => void;
  changeVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  getProgress: (fn: (progress: number) => void) => void;
}

const PlayerContext = createContext<IPlayerData>({} as IPlayerData);

const shuffle = (items: any[]) => {
  return [...items].sort(() => Math.random() - Math.random());
};

export const PlayerProvider = ({ children }: IProps) => {
  const [queue, setQueue] = useState<ITrack[]>();
  const [currentTrack, setCurrentTrack] = useState<ITrack>();
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>(
    PlayerStatus.STOPPED
  );
  const [currentTrackDuration, setCurrentTrackDuration] = useState(0);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement>();
  const [isShuffleActive, setIsShuffleActive] = useState<boolean>(false);
  const [shuffledQueue, setShuffledQueue] = useState<ITrack[]>([]);
  const [isRepeatActive, setIsRepeatActive] = useState<boolean>(false);

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

  const replaceQueue = useCallback(
    (tracks: ITrack[]) => {
      setQueue(tracks);

      if (isShuffleActive) {
        setShuffledQueue(shuffle(tracks));
      }
    },
    [isShuffleActive]
  );

  const changeVolume = useCallback(
    (volume: number) => {
      if (audioElement) {
        audioElement.volume = volume;
      }
    },
    [audioElement]
  );

  const toggleShuffle = () => {
    if (!isShuffleActive) {
      const shuffled = shuffle(
        queue!.filter((value) => value.id !== currentTrack?.id)
      );

      if (currentTrack) {
        shuffled.unshift(currentTrack);
      }

      setShuffledQueue(shuffled);
    }

    setIsShuffleActive(!isShuffleActive);
  };

  const toggleRepeat = () => setIsRepeatActive(!isRepeatActive);

  const getProgress = useCallback(
    (fn: (progress: number) => void) => {
      if (audioElement) {
        audioElement.ontimeupdate = () => fn(audioElement.currentTime);
      }
    },
    [audioElement]
  );

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
        const trackQueue = isShuffleActive ? shuffledQueue : queue;
        const nextTrackIndex = trackQueue?.findIndex(
          (value) => value.id === currentTrack?.id
        );
        const nextTrack = trackQueue![nextTrackIndex! + 1];
        if (!nextTrack && isRepeatActive) {
          return playTrack(trackQueue![0]);
        }

        if (nextTrack) {
          playTrack(nextTrack);
        }
      };
    }
  }, [
    audioElement,
    currentTrack,
    playTrack,
    queue,
    isRepeatActive,
    isShuffleActive,
    shuffledQueue,
  ]);

  return (
    <PlayerContext.Provider
      value={{
        queue: isShuffleActive ? shuffledQueue : queue!,
        playTrack,
        currentTrack,
        playerStatus,
        goToTrack,
        currentTrackDuration,
        isShuffleActive,
        isRepeatActive,
        replaceQueue,
        changeVolume,
        toggleShuffle,
        toggleRepeat,
        getProgress,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
