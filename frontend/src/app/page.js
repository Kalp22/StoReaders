"use client"
import Image from "next/image";

import styles from "./page.module.css";

import Navbar from "@/components/navbar/navbar";
import LatestChapter from "@/components/latestChapter/latestChapter";
import StoriesComponent from "@/components/stories/stories";
import About from "@/components/about/about";

export default function Home() {
  const description = false;

  return (
    <main className={styles.main}>
      <Navbar />
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
