import styles from "./Title.module.css";

interface ITitle {
  textTitle: string;
  textButton?: string;
  onClick?: () => void;
}

export const Title = ({ textTitle, textButton, onClick }: ITitle) => {
  return (
    <div className={styles.main}>
      <p className={styles.title}>{textTitle}</p>
      <p className={styles.button} onClick={onClick}>
        {textButton}
      </p>
    </div>
  );
};
