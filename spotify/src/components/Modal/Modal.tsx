import { usePalette } from "react-palette";
import { IArtist } from "../../services/artist";
import styles from "./Modal.module.css";

interface IProps {
  albumCover: string;
  title: string;
  albumName: string;
  albumReleaseDate: string;
  artists: IArtist[];
}

interface IModal {
  item: IProps;
  isShow: boolean;
  onClick: () => void;
  refModal: any;
}

export const Modal = ({ item, isShow, onClick, refModal }: IModal) => {
  const { data } = usePalette(item.albumCover);
  let date = new Date(item.albumReleaseDate);
  let releaseDate = `${date.getDate()} ${date.toLocaleString("en-us", {
    month: "short",
  })} ${date.getFullYear()}`;

  return (
    <div
      ref={refModal}
      className={styles.main}
      style={
        isShow
          ? {
              opacity: "1",
              visibility: "visible",
              background: `linear-gradient(300deg, ${data.muted}, ${data.darkMuted})`,
            }
          : { opacity: "0", visibility: "hidden" }
      }
    >
      <p className={styles.title}>
        Details{" "}
        <img src="/assets/img/close.svg" alt="close" onClick={onClick} />
      </p>
      <p className={styles.name}>{item.title}</p>

      <div className={styles.group}>
        <p className={styles.day}>Release Date</p>
        <p>{releaseDate}</p>
      </div>

      <div className={styles.group}>
        <p className={styles.albumName}>Album title</p>
        <p>{item.albumName}</p>
      </div>

      <div className={styles.group}>
        <p className={styles.performers}>Performers</p>
        {item.artists.map((item, index, array) => (
          <span key={item.name}>
            {index === array.length - 1 ? item.name : item.name.concat(", ")}
          </span>
        ))}
      </div>
    </div>
  );
};
