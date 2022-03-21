import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerNav}>
          <NavLink to="#" className={styles.headerButton}>
            <img src="/assets/img/arrow.svg" alt="arrow" />
          </NavLink>

          <div className={styles.navigation}>
            <span className={styles.prevLink}>Home</span>
            <img src="/assets/img/small-arrow.svg" alt="arrow-revert" />
            <span className={styles.currLink}>Popular Artist</span>
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
