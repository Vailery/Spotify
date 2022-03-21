import { IUserInfo } from "../../services/userApi";
import styles from "./RightMenu.module.css";

interface IProps {
  user: IUserInfo;
}

export const RightMenu = ({ user }: IProps) => {
  return (
    <div className={styles.rightMenu}>
      <div className={styles.mainInfo}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img src={user.avatarUrl} alt="avatar" />
          </div>

          <div className={styles.userStatus}>
            <p className={styles.name}>{user.name}</p>

            <p className={styles.status}>
              Premium <span>•</span>{" "}
              <img src="/assets/img/premium.svg" alt="avatar" />
            </p>
          </div>
        </div>

        <img
          className={styles.more}
          src="/assets/img/small-arrow.svg"
          alt="arrow"
        />
      </div>
    </div>
  );
};
