import styles from "./Button.module.css";

interface IProps {
  text: string;
  onClick: () => void;
  style?: {};
}

export const Button = ({ text, onClick, style }: IProps) => {
  return (
    <button className={styles.button} onClick={onClick} style={style}>
      {text}
    </button>
  );
};
