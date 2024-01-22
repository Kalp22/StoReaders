import Link from "next/link";

import styles from "./chapter.module.css";

export default function Chapter({ chapter, story_name, key }) {
  return (
    <li className={styles.list}>
      <div className={styles.chapter_label}>
        <div>Chapter {chapter.chapterNumber}</div>
        <div>{chapter.chapterName}</div>
      </div>
      <Link
        className={styles.read_button}
        href={`/story/${story_name}/read/${chapter.chapterName}`}
      >
        Read
      </Link>
    </li>
  );
}
