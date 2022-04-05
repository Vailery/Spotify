import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext";
import styles from "./Menu.module.css";

export interface IMenuListState {
  id: number;
  img: string;
  title: string;
}

interface IMenuState {
  title?: string;
  svg?: string;
  list: IMenuListState[];
}

export const Menu = ({ title, svg, list }: IMenuState) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.menu}>
      {title && svg ? (
        <div className={styles.menuContainer}>
          <p
            style={{
              color: theme.grayText,
            }}
          >
            {title}
          </p>
          <img
            src={svg}
            alt="add-button"
            style={{
              filter: theme.filter,
            }}
          />
        </div>
      ) : title ? (
        <div className={styles.menuContainer}>
          <p
            style={{
              color: theme.grayText,
            }}
          >
            {title}
          </p>
        </div>
      ) : null}

      <ul>
        {list &&
          list.map((item) => (
            <li key={item.id + item.title}>
              <NavLink
                to={{
                  pathname: `/application/${item.title
                    .toLocaleLowerCase()
                    .replace(/\s/g, "_")}`,
                }}
                activeClassName={styles.active}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    filter: theme.filter,
                  }}
                />
                <span
                  style={{
                    color: theme.grayText,
                  }}
                >
                  {item.title}
                </span>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};
