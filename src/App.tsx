import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Login } from "features/login/Login";
import { Player } from "features/player/Player";
import { CallbackHandler } from "features/callbackHandler/CallbackHandler";
import { useAppSelector } from "app/hooks";

// Nota: no se recomienda importar desde node_modules. Esta hecho asi por simplificar
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedIn = useAppSelector(
    (state) => state.session.status === "logged"
  );

  useEffect(() => {
    // Si estamos logueados y no estamos en player. redireccionamos
    if (loggedIn && !location.pathname.includes("/player")) {
      navigate("/player");
      return;
    }

    // Si no estamos logueados, solo debemos acceder a /callback o a /login
    if (
      !loggedIn &&
      location.pathname !== "/callback" &&
      location.pathname !== "/login"
    ) {
      navigate("/login");
    }
  }, [loggedIn, location.pathname, navigate]);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="callback" element={<CallbackHandler />} />
      {loggedIn && <Route path="player/*" element={<Player />} />}
      <Route path="*" element={<p>Path not resolved</p>} />
    </Routes>
  );
}

export default App;
