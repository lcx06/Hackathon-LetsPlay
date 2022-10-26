import styles from "./PlaylistById.module.css";

import play from "assets/play.png";
import { Track } from "types";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { addAllToQueue, getPlaylistInfo, getPlaylistTracks } from "store";
import SongsTable from "components/songs/SongsTable";
import { useParams } from "react-router-dom";

export const PlaylistById = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const {
    tracks,
    next: nextUrl,
    name,
    description,
    images,
  }: {
    tracks: Track[];
    next?: string;
    name: string;
    description: string;
    images: Array<{ url: string }>;
  } = useAppSelector((state) => state.playlistTracks);

  useEffect(() => {
    dispatch(getPlaylistTracks(id as string));
    dispatch(getPlaylistInfo(id as string));
  }, [dispatch, id]);

  const next = () => {
    if (!nextUrl) return;
    dispatch(getPlaylistTracks(id as string, nextUrl));
  };

  const playAll = () => {
    dispatch(addAllToQueue(tracks.map((track) => track.preview_url)));
  };

  return (
    <div className={styles.songs__container}>
      <div className={styles.songs__header}>
        <div className={styles.songs__header__bars} />
        <div className={styles.songs__header__image}>
          <img
            src={images?.[0]?.url}
            alt="Thumbnail"
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div className={styles.songs__header__content}>
          <h1>{name}</h1>
          <p>{description || ""}</p>
          <button onClick={() => playAll()}>
            <img src={play} width={12} alt="Play" /> Play
          </button>
        </div>
      </div>
      <SongsTable tracks={tracks} next={nextUrl ? next : undefined} />
    </div>
  );
};
