import styles from "./Error.module.css";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";

export const Error = () => {
  const container = useRef<HTMLDivElement>(null);

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
    <div className={styles.main}>
      <p>
        If you see this page, it means that I am{" "}
        <span>still working on it</span> or there is <span>no such page</span>
        ...
      </p>
      <div ref={container} className={styles.image} />
    </div>
  );
};
