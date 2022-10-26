import styles from "./NavigationBar.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const SECTIONS = [
  {
    name: "Songs",
    path: "songs",
  },
  {
    name: "Albums",
    path: "albums",
  },
  {
    name: "Playlists",
    path: "playlists",
  },
];

export const NavigationBar = () => {
  const [showSections, setShowSections] = useState(true);

  return (
    <ul className={styles.navbar}>
      <div className={styles.navbar__title} onClick={() => setShowSections(!showSections)}>
        <h3>Your Music</h3>
        <i className={`fas fa-chevron-down ${styles.navbar__title__icon} ${showSections && styles.navbar__title__rotated}`} />
      </div>
      {showSections &&
        SECTIONS.map(({ name, path }) => (
          <li key={name} className={styles.navbar__item}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive ? styles.navbar__item__active : undefined
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
    </ul>
  );
};
