import styles from "./Songs.module.css";

import play from 'assets/play.png'
import { Track } from "types";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { getMyTracks } from "store";
import SongsTable from "components/songs/SongsTable";

export const Songs = () => {
  const dispatch = useAppDispatch();
  const { tracks, next: nextUrl }: { tracks: Track[], next?: string } = useAppSelector(
    (state) => state.myTracks
  );

  useEffect(() => {
    dispatch(getMyTracks());
  }, [dispatch]);

  const next = () => {
    if (!nextUrl) return;
    dispatch(getMyTracks(nextUrl));
  }

  return (
    <div className={styles.songs__container}>
      <div className={styles.songs__header}>
        <div className={styles.songs__header__bars} />
        <div className={styles.songs__header__image}>
          <img
            src={play}
            alt="Album"
            width={64}
            height={64}
          />
        </div>
        <div className={styles.songs__header__content}>
          <h1>Songs</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio blanditiis praesentium sequi iure molestiae assumenda veritatis quaerat illum nihil. Nulla repudiandae cumque maiores corporis quos et sit? Hic, cupiditate facere.</p>
          <button><img src={play} width={12} alt="Play" /> Play</button>
        </div>
      </div>
      <SongsTable tracks={tracks} next={nextUrl ? next : undefined} />
    </div>
  );
};
