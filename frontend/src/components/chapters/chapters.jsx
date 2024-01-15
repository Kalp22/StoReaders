import Link from "next/link";
import styles from "./chapters.module.css";

export default function Chapters({ _id }) {
  return (
    <div className={styles.chapters_wrapper}>
      <div>
        <div className={styles.chapters_text}>Chapters</div>
      </div>
      <ul className={styles.chapters_list}>
        <li>
          <div className={styles.chapter_label}>
            <div>Chapter 12</div>
            <div>Attonment Part 4</div>
          </div>
          <Link className={styles.read_button} href={`/story/${_id}/read/bdgg`}>
            Read
          </Link>
        </li>
        <li>
          <div className={styles.chapter_label}>
            <div>Chapter 12</div>
            <div>Attonment Part 4</div>
          </div>
          <div className={styles.read_button}>Read</div>
        </li>
        <li>
          <div className={styles.chapter_label}>
            <div>Chapter 12</div>
            <div>Attonment Part 4</div>
          </div>
          <div className={styles.read_button}>Read</div>
        </li>
        <li>
          <div className={styles.chapter_label}>
            <div>Chapter 12</div>
            <div>Attonment Part 4</div>
          </div>
          <div className={styles.read_button}>Read</div>
        </li>
        <li>
          <div className={styles.chapter_label}>
            <div>Chapter 12</div>
            <div>Attonment Part 4</div>
          </div>
          <div className={styles.read_button}>Read</div>
        </li>
        <li>
          <div className={styles.chapter_label}>
            <div>Chapter 12</div>
            <div>Attonment Part 4</div>
          </div>
          <div className={styles.read_button}>Read</div>
        </li>
        <li>
          <div className={styles.chapter_label}>
            <div>Chapter 12</div>
            <div>Attonment Part 4</div>
          </div>
          <div className={styles.read_button}>Read</div>
        </li>
        <li>
          <div className={styles.chapter_label}>
            <div>Chapter 10</div>
            <div>Attonment Part 4</div>
          </div>
          <div className={styles.read_button}>Read</div>
        </li>
        <li>
          <div className={styles.chapter_label}>
            <div>Chapter 12</div>
            <div>Attonment Part 4</div>
          </div>
          <div className={styles.read_button}>Read</div>
        </li>
      </ul>
    </div>
  );
}
