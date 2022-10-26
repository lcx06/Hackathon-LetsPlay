import { useEffect } from "react";

import styles from "./Playlists.module.css";

import { useAppSelector, useAppDispatch } from "app/hooks";

import type { Playlist } from "types";
import { getMyPlaylists } from "store";
import { Link } from "react-router-dom";

export const Playlists = () => {
  const dispatch = useAppDispatch();
  const { playlists }: { playlists: Array<Playlist> } = useAppSelector(
    (state) => state.myPlaylists
  );

  useEffect(() => {
    dispatch(getMyPlaylists());
  }, [dispatch]);
  return (
    <div className={styles.playlists__container}>
      {playlists?.map((playlist) => (
        <Link to={`/player/playlist/${playlist.id}`} key={playlist.id}>
          <img
            alt={playlist.name}
            src={playlist.images[0]?.url}
            className={styles.playlists__item}
          />
        </Link>
      ))}
    </div>
  );
};
