import styles from "./dashboardLeft.module.css";

import { FaUser } from "react-icons/fa";

export default function DashboardLeft({
  readStories,
  readChapters,
  username,
  email,
}) {
  console.log("readStory", readStories, "readChapter", readChapters);
  return (
    <>
      <div className={styles.icon_wrapper}>
        <div className={styles.user_icon}>
          <FaUser size={150} />
        </div>
      </div>
      <div className={styles.user_name}>{username}</div>
      <div className={styles.user_email}>{email}</div>
      <div className={styles.user_stats}>
        <div className={styles.no_of}>
          <div>Stories Read</div>
          <div>{readStories && readStories.length}</div>
        </div>
        <div className={styles.no_of}>
          <div>Chapters Read</div>
          <div>{readChapters && readChapters.length}</div>
        </div>
      </div>
    </>
  );
}
