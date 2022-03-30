import { MouseEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { clearSession } from "../../services/authentication";
import styles from "./DropdownMenu.module.css";

interface IProps {
  avatar: string;
  name: string;
}

export const DropdownMenu = ({ avatar, name }: IProps) => {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const history = useHistory();

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
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

  const goTo = () => {
    clearSession(() => {
      history.go(0);
    });
  };

  return (
    <div className={styles.main}>
      <div onClick={onClick} className={styles.mainInfo}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
          </div>

          <div className={styles.userStatus}>
            <p className={styles.name}>{name}</p>

            <p className={styles.status}>
              Premium <span>•</span>{" "}
              <img src="/assets/img/premium.svg" alt="avatar" />
            </p>
          </div>
        </div>

        <img
          className={`${styles.more} ${
            isActive ? styles.active : styles.inactive
          }`}
          src="/assets/img/small-arrow.svg"
          alt="arrow"
        />
      </div>

      <nav
        ref={dropdownRef}
        className={`${styles.menu} ${
          isActive ? styles.active : styles.inactive
        }`}
      >
        <ul>
          <li>
            <p onClick={goTo}>Quit</p>
          </li>
        </ul>
      </nav>
    </div>
  );
};
