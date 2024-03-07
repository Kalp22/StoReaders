import styles from "./dashboardLeft.module.css";

import { Merriweather } from "next/font/google";

import { FaUser } from "react-icons/fa";

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function DashboardLeft({
  readStories,
  readChapters,
  username,
  email,
}) {
  return (
    <>
      <div className={styles.basic_info_wrap}>
        <div className={styles.icon_wrapper}>
          <div className={styles.user_icon}>
            <FaUser size={150} />
          </div>
        </div>
        <div className={styles.basic_info_cover}>
          <div className={`${styles.user_name} ${merriweather.className}`}>
            {username}
          </div>
          <div className={`${styles.user_email} ${merriweather.className}`}>
            {email}
          </div>
        </div>
      </div>
      <div className={styles.user_stats}>
        <div className={styles.no_of}>
          <span>Stories Read</span>
          <div>{readStories && readStories.length}</div>
        </div>
        <div className={styles.no_of}>
          <span>Chapters Read</span>
          <div>{readChapters && readChapters.length}</div>
        </div>
      </div>
    </>
  );
}
