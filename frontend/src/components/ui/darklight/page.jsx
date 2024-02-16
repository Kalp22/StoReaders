"use client";
import styles from "./page.module.css";

import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

import { useContext, useEffect } from "react";

import { ThemeContext } from "@/app/context/ThemeContext";

export default function DarkLight() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Add useEffect to set the initial class based on the theme
  useEffect(() => {
    const toggle = document.querySelector(`.${styles.toggle}`);
    if (theme) {
      toggle.classList.remove(styles.toggle_alt);
    } else {
      toggle.classList.add(styles.toggle_alt);
    }
  }, [theme]);

  const toggleButton = () => {
    const toggle = document.querySelector(`.${styles.toggle}`);
    toggle.classList.toggle(styles.toggle_alt);

    toggleTheme();
  };

  return (
    <div className={styles.toggle_button} onClick={toggleButton}>
      <section>
        <MdOutlineLightMode
          id="lightImage"
          size={`22px`}
          className={styles.svg}
        />
      </section>
      <section className={styles.toggle}></section>
      <section>
        <MdOutlineDarkMode
          id="darkImage"
          size={`22px`}
          className={styles.svg}
        />
      </section>
    </div>
  );
}
