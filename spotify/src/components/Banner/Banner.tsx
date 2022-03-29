import { ReactNode } from "react";
import styles from "./Banner.module.css";

interface IProps {
  children: ReactNode;
  bgColor?: string;
}

export const Banner = ({ children, bgColor }: IProps) => {
  return (
    <div className={styles.main} style={{ background: bgColor }}>
      {children}
    </div>
  );
};
