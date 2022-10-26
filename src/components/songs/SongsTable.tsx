import styles from "./SongsTable.module.css";

import { Track } from "types";
import { useAppDispatch } from "app/hooks";
import { playNow } from "store";

export default function SongsTable({
  tracks,
  next,
}: {
  tracks: Track[];
  next?: () => void;
}) {
  const dispatch = useAppDispatch();

  return (
    <>
      <table className={styles.songs__table}>
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
          </tr>
        </thead>
        <tbody>
          {tracks?.map((track) => (
            <tr key={track.id} onClick={() => dispatch(playNow(track.preview_url))}>
              <td>{track.name}</td>
              <td>{track.artists.map((val) => val.name).join(", ")}</td>
              <td>{track.album.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {next && <button className={styles.songs_add_more} onClick={() => next()}>
        <i className="fas fa-add" /> Load more
      </button>}
    </>
  );
}
