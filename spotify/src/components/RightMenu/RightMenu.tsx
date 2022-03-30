import { IUserInfo } from "../../services/userApi";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import styles from "./RightMenu.module.css";

interface IProps {
  user: IUserInfo;
}

export const RightMenu = ({ user }: IProps) => {
  return (
    <div className={styles.rightMenu}>
      <DropdownMenu avatar={user.avatarUrl} name={user.name} />
    </div>
  );
};
