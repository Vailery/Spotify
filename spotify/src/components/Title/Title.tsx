import { useContext } from "react";
import { ThemeContext } from "../../services/ThemeContext";
import styles from "./Title.module.css";

interface ITitle {
  textTitle: string;
  textButton?: string;
  onClick?: () => void;
  style?: {};
}

export const Title = ({ textTitle, textButton, onClick, style }: ITitle) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.main}
      style={
        style
          ? style
          : {
              background: theme.darkBckgColor,
            }
      }
    >
      <p
        className={styles.title}
        style={{
          color: theme.lightText,
        }}
      >
        {textTitle}
      </p>
      <p className={styles.button} onClick={onClick}>
        {textButton}
      </p>
    </div>
  );
};
