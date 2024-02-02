import styles from "./dashboardRight.module.css";

import Link from "next/link";

export default function DashboardRight() {
  const settingsToggle = () => {
    const settingsList = document.querySelector(`.${styles.settings_wrapper}`);
    settingsList.classList.toggle(`${styles.settings_wrapper_open}`);
  };
  
  return (
    <>
      <div className={styles.options_wrapper}>
        <Link href={"/"} className={styles.latest_chapter}>
          <div>Latest Chapter</div>
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
