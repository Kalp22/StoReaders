import styles from "./dashboardRight.module.css";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardRight() {
  const [latestStoryName, setLatestStoryName] = useState("");
  useEffect(() => {
    try {
      fetch(`${process.env.API_URL}stories/getLatest`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLatestStoryName(data.storyName);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const settingsToggle = () => {
    const settingsList = document.querySelector(`.${styles.settings_wrapper}`);
    settingsList.classList.toggle(`${styles.settings_wrapper_open}`);
  };

  return (
    <>
      <div className={styles.options_wrapper}>
        <Link
          href={`/story/${latestStoryName.replace(/\s/g, "-")}`}
          className={styles.latest_chapter}
        >
          <p>Latest Story</p>
          <p>{latestStoryName}</p>
        </Link>
        <div className={styles.line}></div>
        <div className={styles.options_cover}>
          <Link href={"/stories"} className={styles.keep_reading}>
            <div>Keep Reading</div>
          </Link>
          <div className={styles.settings} onClick={() => settingsToggle()}>
            Account Settings
          </div>
          <div className={styles.settings_wrapper}>
            <ul className={styles.settings_list}>
              <li
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/");
                }}
              >
                Log Out
              </li>
              <li>Delete Account</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
