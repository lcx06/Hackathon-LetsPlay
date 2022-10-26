import { useEffect } from "react";
import { getMyAlbums } from "store";

import styles from "./Albums.module.css";

import { useAppSelector, useAppDispatch } from "app/hooks";

import type { Album } from "types";

export const Albums = () => {
  const dispatch = useAppDispatch();
  const { albums }: { albums: Array<Album> } = useAppSelector(
    (state) => state.myAlbums
  );

  useEffect(() => {
    dispatch(getMyAlbums());
  }, [dispatch]);

  return (
    <div className={styles.albums__container}>
      {albums.map((album) => (
        <div key={album.id} className={styles.albums__item}>
          <img
            alt={album.name}
            src={album.images[0]?.url}
          />
          <h3>{album.name}</h3>
        </div>
      ))}
    </div>
  );
};
