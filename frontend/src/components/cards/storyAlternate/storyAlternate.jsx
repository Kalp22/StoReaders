import styles from "./storyAlternate.module.css";

import { Nunito } from "next/font/google";

import Link from "next/link";

const nunito = Nunito({
  weight: ["variable"],
  subsets: ["latin"],
});

export default function StoryAlternate({ story, readChapters }) {
  const storyId = story.storyName && story.storyName.replace(/\s/g, "-");
  return (
    <Link href={`/story/${storyId}`} className={styles.story_wrapper}>
      <div className={styles.name_wrap}>
        <p className={`${styles.story_name} ${nunito.className}`}>
          {story.storyName}
        </p>
        <div className={styles.line}></div>
      </div>
      <div className={styles.story_details}>
        <div className={styles.all_wrapper}>
          <div className={styles.all_titles}>Status</div>
          <div className={styles.all_values}>
            {story.status ? "Ongoing" : "Completed"}
          </div>
        </div>
        <div className={styles.all_wrapper}>
          <div className={styles.all_titles}>Chapters Read</div>
          <div className={styles.all_values}>{readChapters}</div>
        </div>
        <div className={styles.all_wrapper}>
          <div className={styles.all_titles}>Latest Chapter</div>
          <div className={styles.all_values}>{story.totalNumberOfChapters}</div>
        </div>
      </div>
    </Link>
  );
}
