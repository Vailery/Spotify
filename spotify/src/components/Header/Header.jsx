import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export const Header = () => {
  const [navigation, setNavigation] = useState("");
  const history = useHistory();
  const location = useLocation();
  console.log(history);

  const from = "/application/".length;

  useEffect(() => {
    const navigation = location.pathname
      .substring(from)
      .replaceAll("_", " ")
      .replaceAll("/", " / ")
      .split(/\s+/)
      .map((value) => {
        return value.trim().length !== 0
          ? value[0].toUpperCase() + value.substring(1)
          : "";
      })
      .join(" ");

    setNavigation(navigation);
  }, [location]);

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerNav}>
          <div
            onClick={() => {
              history.goBack();
            }}
            className={styles.headerButton}
          >
            <img src="/assets/img/arrow.svg" alt="arrow" />
          </div>

          <div className={styles.navigation}>
            {navigation ? (
              navigation.split("/").map((item, index, array) => {
                if (index === array.length - 1) {
                  return (
                    <span key={item} className={styles.currLink}>
                      {item}
                    </span>
                  );
                } else {
                  return (
                    <div className={styles.mainLink} key={item}>
                      <span className={styles.prevLink}>{item}</span>{" "}
                      <img
                        src="/assets/img/small-arrow.svg"
                        alt="arrow-revert"
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
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <button>
                <img src="/assets/img/search.svg" alt="search" />
              </button>

              <input
                type="text"
                placeholder="Search music, artist, albums..."
              />
            </div>
          </div>

          <NavLink to="#" className={styles.headerButton}>
            <img src="/assets/img/notification.svg" alt="notification" />
          </NavLink>

          <NavLink to="#" className={styles.headerButton}>
            <img src="/assets/img/sun.svg" alt="sun" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
