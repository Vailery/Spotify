import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../services/ThemeContext";
import { ITrack } from "../../services/track";
import { Modal } from "../Modal/Modal";
import styles from "./MainPlayList.module.css";

interface IProps {
  track: ITrack;
  albumCover?: string;
}

export const Details = ({ track, albumCover }: IProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const modalRef = useRef<HTMLElement>(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (modalRef.current !== null && !modalRef.current.contains(e.target)) {
        setIsShowModal(!isShowModal);
      }
    };

    if (isShowModal) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isShowModal]);

  useEffect(() => {
    const root = document.getElementById("root");
    const player = document.getElementById("player");

    isShowModal
      ? root?.setAttribute("style", "pointer-events: none")
      : root?.setAttribute("style", "pointer-events: auto");

    isShowModal
      ? player?.setAttribute("style", "opacity: 0")
      : player?.setAttribute("style", "opacity: 1");
  }, [isShowModal]);

  return (
    <>
      <div className={styles.details}>
        <img
          className={styles.dots}
          src="/assets/img/dots.svg"
          alt="dots"
          onClick={() => {
            setIsShowModal(!isShowModal);
          }}
          style={{
            filter: theme.filter,
          }}
        />

        <p
          style={{
            color: theme.lightText,
          }}
        >
          Details
        </p>
      </div>

      <Modal
        item={track}
        isShow={isShowModal}
        onClick={() => {
          setIsShowModal(!isShowModal);
        }}
        refModal={modalRef}
        albumCover={albumCover}
      />
      <div
        className={styles.blockApp}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={
          isShowModal
            ? {
                opacity: "1",
                visibility: "visible",
                display: "block",
              }
            : { opacity: "0", visibility: "hidden", display: "none" }
        }
      />
    </>
  );
};
