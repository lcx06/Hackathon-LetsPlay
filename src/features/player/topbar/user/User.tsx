import styles from "./User.module.css";

export const User = ({
  name,
  avatarURL,
}: {
  name: string;
  avatarURL: string;
}) => {
  return (
    <div className={styles.user__container}>
      <div className={styles.user__container__avatar}>
        {avatarURL ? (
          <img
            src={avatarURL}
            alt="Avatar"
            width={"100%"}
            height={"100%"}
          />
        ) : (
          <i className={"fas fa-user"} />
        )}
      </div>
      <p>{name}</p>
    </div>
  );
};
