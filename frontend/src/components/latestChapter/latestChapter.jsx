import styles from "./latestChapter.module.css";

export default function LatestChapter() {
  return (
    <div className={styles.latest_chapter_wrapper}>
      <div className={styles.latest_chapter_cover}>
        <div className={styles.latest_text}>Latest Chapter :</div>
        <div className={styles.chapter_name}>Chapter 1 : Start</div>
      </div>
    </div>
  );
}
