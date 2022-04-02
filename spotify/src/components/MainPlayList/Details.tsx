import { useEffect, useRef, useState } from "react";
import { ITrack } from "../../services/track";
import { Modal } from "../Modal/Modal";
import styles from "./MainPlayList.module.css";

interface IProps {
  track: ITrack;
}

export const Details = ({ track }: IProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const modalRef = useRef<HTMLElement>(null);

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
        />

        <p>Details</p>
      </div>

      <Modal
        item={track}
        isShow={isShowModal}
        onClick={() => {
          setIsShowModal(!isShowModal);
        }}
        refModal={modalRef}
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
