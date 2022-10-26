import { PlaylistById } from "features/player/mainPanel/playlists/PlaylistById";
import { Playlists } from "features/player/mainPanel/playlists/Playlists";
import { Query } from "features/player/mainPanel/query/Query";
import { Songs } from "features/player/mainPanel/songs/Songs";
import { Route, Routes } from "react-router-dom";

import { Albums } from "./albums/Albums";

export const MainPanel = () => {
  return (
    <>
      <Routes>
        <Route index element={<Albums />} />
        <Route path="albums" element={<Albums />} />
        <Route path="songs" element={<Songs />} />
        <Route path="playlists" element={<Playlists />} />
        <Route path="playlist/:id" element={<PlaylistById />} />
        <Route path="query" element={<Query />} />
      </Routes>
    </>
  );
};
