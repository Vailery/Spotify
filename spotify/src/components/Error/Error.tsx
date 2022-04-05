import styles from "./Error.module.css";
import lottie from "lottie-web";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../services/ThemeContext";

export const Error = () => {
  const container = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("./puzzle.json"),
      });
    }
  }, [container]);

  return (
    <div
      className={styles.main}
      style={{
        backgroundColor: theme.darkBckgColor,
      }}
    >
      <p
        style={{
          color: theme.lightText,
        }}
      >
        If you see this page, it means that I'm <span>still working on it</span>{" "}
        or there is <span>no such page</span>
        ...
      </p>
      <div ref={container} className={styles.image} />
    </div>
  );
};
