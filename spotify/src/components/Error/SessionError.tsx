import { useHistory } from "react-router-dom";
import { clearSession } from "../../services/authentication";
import { Button } from "../Button/Button";
import styles from "./Error.module.css";

export const SessionError = () => {
  const history = useHistory();

  const goTo = () => {
    clearSession(() => {
      history.go(0);
    });
  };

  return (
    <div className={styles.mainSessionError}>
      <p>Looks like your session is over.</p>
      <Button text="Restart" onClick={goTo} />
    </div>
  );
};
