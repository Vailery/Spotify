import { usePlayer } from "../../services/player";
import { IUserInfo } from "../../services/userApi";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import Moment from "react-moment";
import moment from "moment";
import styles from "./RightMenu.module.css";
import { Title } from "../Title/Title";

interface IProps {
  user: IUserInfo;
}

moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seс",
    ss: "%ss",
    m: "1min",
    mm: "%dmin",
    h: "1hr",
    hh: "%dhr",
    d: "1d",
    dd: "%dd",
    M: "1m",
    MM: "%dM",
    y: "1y",
    yy: "%dY",
  },
});

export const RightMenu = ({ user }: IProps) => {
  const { recentQueue, timeRecentQueue } = usePlayer();

  console.log(recentQueue);
  console.log(timeRecentQueue);

  return (
    <div className={styles.rightMenu}>
      <DropdownMenu avatar={user.avatarUrl} name={user.name} />

      <div className={styles.recentPlayed}>
        <Title
          textTitle="Recent Played"
          textButton="See All"
          onClick={() => {}}
        />

        {recentQueue.length !== 0 ? (
          <div className={styles.tracks}>
            {recentQueue.map((item, index) => {
              if (index < 7) {
                return (
                  <div key={`${item.title} ${index}`} className={styles.songs}>
                    <div className={styles.mainInfo}>
                      <img src={item.albumCover} alt={item.albumCover} />

                      <div className={styles.info}>
                        <p className={styles.infoTitle}>{item.title}</p>
                        <p className={styles.infoArtists}>
                          {item.artists.map((item, index, array) => (
                            <span key={item.name}>
                              {index === array.length - 1
                                ? item.name
                                : item.name.concat(", ")}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    <Moment locale="en" fromNow>
                      {timeRecentQueue[index]}
                    </Moment>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <p className={styles.error}>Start listening smth...</p>
        )}
      </div>
    </div>
  );
};
