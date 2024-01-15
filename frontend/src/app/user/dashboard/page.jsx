"use client";
import styles from "./page.module.css";

import { FaUser } from "react-icons/fa";

import DarkLight from "@/components/ui/darklight/page";
import DashboardCenter from "@/components/dashboardCenter/dashboardCenter";

import Link from "next/link";

export default function UserDashboard() {
  const settingsToggle = () => {
    const settingsList = document.querySelector(`.${styles.settings_wrapper}`);
    settingsList.classList.toggle(`${styles.settings_wrapper_open}`);
  };

  return (
    <div className={styles.dashboard_wrapper}>
      <div className={styles.dashboard_top}>
        <div className={styles.home_button}>
          <Link href="/">HOME </Link>
        </div>
        <DarkLight />
      </div>
      <div className={styles.dashboard_cover}>
        <div className={styles.dashboard_left}>
          <div className={styles.icon_wrapper}>
            <div className={styles.user_icon}>
              <FaUser size={150} />
            </div>
          </div>
          <div className={styles.user_name}>Kalpesh</div>
          <div className={styles.user_email}>kalpesh22nimje@gmail.com</div>
          <div className={styles.user_stats}>
            <div className={styles.no_of}>
              <div>Stories Read</div>
              <div>0</div>
            </div>
            <div className={styles.no_of}>
              <div>Chapters Read</div>
              <div>0</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboard_center}>
          <DashboardCenter />
        </div>
        <div className={styles.dashboard_right}>
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
                  <li>Log Out</li>
                  <li>Delete Account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
