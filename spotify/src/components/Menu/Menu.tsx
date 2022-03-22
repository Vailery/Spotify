import { NavLink } from "react-router-dom";
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
  return (
    <div className={styles.menu}>
      {title && svg ? (
        <div className={styles.menuContainer}>
          <p>{title}</p>
          <img src={svg} alt="add-button" />
        </div>
      ) : title ? (
        <div className={styles.menuContainer}>
          <p>{title}</p>
        </div>
      ) : null}

      <ul>
        {list &&
          list.map((item) => (
            <li key={item.id + item.title}>
              <NavLink to="#" activeClassName={styles.active}>
                <img src={item.img} alt={item.title} />
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};
