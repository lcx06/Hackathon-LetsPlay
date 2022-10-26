import { RootState } from "app/store";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import {
  authorizationRequested,
  hasBeenAuthorized,
} from "./spotify.session.slice";

const CLIENT_ID = "0a6de255b0bc400b85c9b9276eb2a360";
const CLIENT_SECRET = "7563d7d8efb34d5bbea469921b02d0f7";
const REDIRECT_URI = "http://localhost:3000/callback";
const SPOTIFY_URL = "https://accounts.spotify.com";

const scopes = [
  "playlist-read-private",
  "user-follow-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-read-email",
  "user-read-currently-playing",
];

const login = () => {
  const width = 450;
  const height = 730;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  const url = `${SPOTIFY_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=code`;

  window.open(
    url,
    "Spotify",
    "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
      width +
      ", height=" +
      height +
      ", top=" +
      top +
      ", left=" +
      left
  );
};

export const requestAuthorization =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const spotifyStatus = getState().session.status;
    if (spotifyStatus === "initial") {
      const accessToken = localStorage.getItem("AT");
      const refreshToken = localStorage.getItem("RT");
      if (accessToken && refreshToken) {
        dispatch(
          hasBeenAuthorized({
            accessToken,
            refreshToken,
          })
        );
      } else {
        dispatch(authorizationRequested());
        login();
      }
    }
  };

export const requestAccesToken = async (code: string) => {
  const url = SPOTIFY_URL + "/api/token";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        authorization: `Basic ${window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
      },
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error(response);
    }
  } catch (e) {
    console.error(e);
  }
};
