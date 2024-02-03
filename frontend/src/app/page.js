import styles from "./page.module.css";

import Navbar from "@/components/navbar/navbar";
import LatestStory from "@/components/latestChapter/latestChapter";
import About from "@/components/about/about";
import Stories from "@/components/fetch/stories";

export default function Home() {
  const description = false;

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.landing_wrapper}>
        <div className={styles.landing_cover}>
          <div className={styles.title}>StoReaders</div>
          <div className={styles.subtitle}>A place to read stories</div>
        </div>
      </div>
      <LatestStory />
      <Stories description={description} />
      <About />
    </main>
  );
}
