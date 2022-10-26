import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";

import { Search } from "./search/Search";
import { User } from "./user/User";

import { getUserProfile } from "store";

import styles from "./Topbar.module.css";

import logo from "assets/logo.png";
import logoReduced from "assets/logo_mini.png";
import useMediaQuery from "hooks/useMediaQuery";

export const Topbar = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const dispatch = useAppDispatch();
  const { displayName, avatarURL } = useAppSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className={styles.topbar}>
      <div className={styles.topbar__logo}>
        <img src={isDesktop ? logo : logoReduced} alt="Logo" height={isDesktop ? "100%" : "60%"} />
      </div>
      {isDesktop && <div className={styles.topbar__search}>
        <Search />
      </div>}
      <div className={styles.topbar__user}>
        <User name={displayName} avatarURL={avatarURL} />
      </div>
    </div>
  );
};
