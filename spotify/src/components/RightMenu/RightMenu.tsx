import { usePlayer } from "../../services/player";
import { IUserInfo } from "../../services/userApi";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import Moment from "react-moment";
import moment from "moment";
import styles from "./RightMenu.module.css";
import { Title } from "../Title/Title";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../services/ThemeContext";

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
  const { recentQueue, timeRecentQueue, currentTrack } = usePlayer();
  const { theme } = useContext(ThemeContext);
  const history = useHistory();

  return (
    <div
      className={styles.rightMenu}
      style={{
        background: theme.lightBckgColor,
      }}
    >
      <DropdownMenu avatar={user.avatarUrl} name={user.name} />

      <div
        className={styles.recentPlayed}
        style={{
          background: theme.lightBckgColor,
        }}
      >
        <Title
          textTitle="Recent Played"
          textButton="See All"
          onClick={() => {
            history.push("/application/recent_played");
          }}
          style={{
            background: theme.lightBckgColor,
          }}
        />

        {recentQueue.length !== 0 ? (
          <div
            className={styles.tracks}
            style={{
              background: theme.lightBckgColor,
            }}
          >
            {recentQueue.map((item, index) => {
              const isActive = currentTrack?.id === item.id;

              if (index < 7) {
                return (
                  <div
                    key={`${item.title} ${index}`}
                    className={styles.songs}
                    style={{
                      background: theme.lightBckgColor,
                    }}
                  >
                    <div
                      className={styles.mainInfo}
                      style={{
                        background: theme.lightBckgColor,
                      }}
                    >
                      <img src={item.albumCover} alt={item.albumCover} />

                      <div
                        className={`${styles.info} ${
                          isActive ? styles.active : ""
                        } `}
                        style={{
                          background: theme.lightBckgColor,
                        }}
                      >
                        <p
                          className={styles.infoTitle}
                          style={{
                            color: theme.lightText,
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          className={styles.infoArtists}
                          style={{
                            color: theme.grayText,
                          }}
                        >
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

                    <Moment
                      locale="en"
                      fromNow
                      style={{
                        color: theme.grayText,
                      }}
                    >
                      {timeRecentQueue[index]}
                    </Moment>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <p
            className={styles.error}
            style={{
              color: theme.grayText,
            }}
          >
            Start listening smth...
          </p>
        )}
      </div>
    </div>
  );
};
