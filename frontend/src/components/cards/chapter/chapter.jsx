import Link from "next/link";

import styles from "./chapter.module.css";

export default function Chapter({ chapter, story_name }) {
  const storyName = story_name.replace(/\s/g, "-");
  const chapterName = chapter.chapterName.replace(/\s/g, "-");
  return (
    <li className={styles.list}>
      <div className={styles.chapter_label}>
        <div>Chapter {chapter.chapterNumber}</div>
        <div>{chapter.chapterName}</div>
      </div>
      <Link
        className={styles.read_button}
        href={`/story/${storyName}/read/${chapterName}`}
      >
        Read
      </Link>
    </li>
  );
}
