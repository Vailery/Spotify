import { NavLink, useHistory, useLocation } from "react-router-dom";
import {
  useEffect,
  useState,
  ChangeEvent,
  useCallback,
  useContext,
} from "react";
import styles from "./Header.module.css";
import { ThemeContext } from "../../services/ThemeContext";

interface IProps {
  search: string;
  setSearch: (str: string) => void;
}

export const Header = ({ search, setSearch }: IProps) => {
  const { isLight, changeIsLight, theme } = useContext(ThemeContext);
  const [navigation, setNavigation] = useState("");
  const history = useHistory();
  const location = useLocation();

  const from = "/application/".length;

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      history.push("/application/search");
    },
    [setSearch]
  );

  useEffect(() => {
    if (history.location.pathname !== "/application/search") {
      setSearch("");
    }
  }, [history.location.pathname]);

  useEffect(() => {
    const navigation = location.pathname
      .substring(from)
      .replaceAll("_", " ")
      .replaceAll("/", " / ")
      .split(/\s+/)
      .map((value) => {
        if (value.length < 20) {
          return value.trim().length !== 0
            ? value[0].toUpperCase() + value.substring(1)
            : "";
        }
      });

    if (navigation[navigation.length - 1] == undefined) {
      navigation.splice(-2, 3);
    }

    setNavigation(navigation.join(" "));
  }, [location]);

  return (
    <div
      className={styles.header}
      style={{
        background: theme.darkBckgColor,
      }}
    >
      <div className={styles.headerContainer}>
        <div className={styles.headerNav}>
          <div
            id="nav-button"
            onClick={() => {
              return search.length !== 0 ? null : history.goBack();
            }}
            className={styles.headerButton}
            style={{
              background: theme.lightBckgColor,
            }}
          >
            <img
              src="/assets/img/arrow.svg"
              alt="arrow"
              style={{
                filter: theme.filter,
              }}
            />
          </div>

          <div className={styles.navigation}>
            {navigation ? (
              navigation.split("/").map((item, index, array) => {
                if (index === array.length - 1) {
                  return (
                    <span
                      key={item}
                      className={styles.currLink}
                      style={{ color: theme.lightText }}
                    >
                      {item}
                    </span>
                  );
                } else {
                  return (
                    <div className={styles.mainLink} key={item}>
                      <span
                        className={styles.prevLink}
                        style={{ color: theme.gText }}
                      >
                        {item}
                      </span>{" "}
                      <img
                        src="/assets/img/small-arrow.svg"
                        alt="arrow-revert"
                        style={{ filter: theme.filter }}
                      />
                    </div>
                  );
                }
              })
            ) : (
              <span className={styles.currLink}>Main</span>
            )}
          </div>
        </div>

        <div className={styles.headerAction}>
          <div
            className={styles.searchContainer}
            style={{
              background: theme.lightBckgColor,
            }}
          >
            <div className={styles.search}>
              <button>
                <img
                  src="/assets/img/search.svg"
                  alt="search"
                  style={{
                    filter: theme.filter,
                  }}
                />
              </button>

              <input
                type="text"
                placeholder="Search music, artist, albums..."
                value={search}
                onChange={onChange}
                style={{
                  color: theme.placeholderColor,
                }}
              />
            </div>
          </div>

          <NavLink
            to="#"
            className={styles.headerButton}
            style={{
              background: theme.lightBckgColor,
            }}
          >
            <img
              src="/assets/img/notification.svg"
              alt="notification"
              style={{
                filter: theme.filter,
              }}
            />
          </NavLink>

          <a
            className={styles.headerButton}
            onClick={() => changeIsLight()}
            style={{
              background: theme.lightBckgColor,
            }}
          >
            <img
              src={isLight ? "/assets/img/sun.svg" : "/assets/img/moon.svg"}
              alt="darkmode"
              style={{
                filter: theme.filter,
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
