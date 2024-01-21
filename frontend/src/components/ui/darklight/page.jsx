"use client";
import styles from "./page.module.css";

import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

import { useContext } from "react";

import { ThemeContext } from "@/app/context/ThemeContext";

export default function DarkLight() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleButton = () => {
    const toggle = document.querySelector(`.${styles.toggle}`);
    toggle.classList.toggle(styles.toggle_alt);

    toggleTheme();
  };

  return (
    <div className={styles.toggle_button} onClick={toggleButton}>
      <div>
        <MdOutlineLightMode size={"22px"} className={styles.svg} />
      </div>
      <div className={styles.toggle}></div>
      <div>
        <MdOutlineDarkMode size={"22px"} className={styles.svg} />
      </div>
    </div>
  );
}
