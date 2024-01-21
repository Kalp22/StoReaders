"use client"

import Image from "next/image";
import { useState } from "react";

import styles from "./page.module.css";

import Navbar from "@/components/navbar/navbar";
import LatestChapter from "@/components/latestChapter/latestChapter";
import StoriesComponent from "@/components/stories/stories";
import About from "@/components/about/about";

export default function Home() {
  const [theme, setTheme] = useState(false);
  const description = false;

  return (
    <main className={styles.main} data-theme={theme ? "light" : "dark"}>
      <Navbar />
      <div className={styles.empty_div_below_navbar}></div>{" "}
      {/* This is to make sure the navbar doesn't cover the content */}
      <div className={styles.landing_wrapper}>
        <div className={styles.landing_cover}>
          <div className={styles.title}>StoReaders</div>
          <div className={styles.subtitle}>
            A place to read stories
          </div>
        </div>
      </div>
      <LatestChapter />
      <StoriesComponent description={description} />
      <About />
    </main>
  );
}
