import { useAppDispatch, useAppSelector } from "app/hooks";
import useQuery from "hooks/useQuery";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { makeQuery, playNow } from "store";
import { Album, Playlist, Track } from "types";
import styles from "./Query.module.css";

export const Query = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { results }: { results: (Track | Playlist | Album)[] } = useAppSelector(
    (state) => state.query
  );

  const searchTerm = useMemo(() => query.get("q") ?? "", [query]);

  useEffect(() => {
    dispatch(makeQuery(searchTerm));
  }, [dispatch, searchTerm]);

  const getImage = (item: any) => {
    if ("images" in item) {
      return item.images[0]?.url;
    } else if ("album" in item) {
      return item.album.images[0]?.url;
    }
  }

  const handleClick = (item: any) => {
    if ("preview_url" in item) {
      dispatch(playNow(item.preview_url));
    } else if (item.type === "playlist") {
      navigate(`/player/playlist/${item.id}`);
    }
  }

  return (
    <div className={styles.query__container}>
      {results?.map((result) => (
        <div key={result.id} className={styles.query__item} onClick={() => handleClick(result)}>
          <img src={getImage(result)} alt="Display" width={45} />
          <div className={styles.query__item__content}>
            <h3>{result.name}</h3>
            <p>{result.type.charAt(0).toUpperCase() + result.type.slice(1)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
