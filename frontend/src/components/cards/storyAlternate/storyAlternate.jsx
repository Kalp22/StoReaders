import styles from "./storyAlternate.module.css";

import Link from "next/link";

export default function StoryAlternate({ story, readChapters }) {
  const storyId =
    story.storyBasic.storyName &&
    story.storyBasic.storyName.replace(/\s/g, "-");
  return (
    <Link href={`/story/${storyId}`} className={styles.story_wrapper}>
      <div className={styles.name_wrap}>
        <div className={styles.story_name}>{story.storyBasic.storyName}</div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.story_details}>
        <div className={styles.all_wrapper}>
          <div className={styles.all_titles}>Status</div>
          <div className={styles.all_values}>
            {story.storyBasic.status ? "Ongoing" : "Completed"}
          </div>
        </div>
        <div className={styles.all_wrapper}>
          <div className={styles.all_titles}>Chapters Read</div>
          <div className={styles.all_values}>{readChapters}</div>
        </div>
        <div className={styles.all_wrapper}>
          <div className={styles.all_titles}>Latest Chapter</div>
          <div className={styles.all_values}>
            {story.storyBasic.totalNumberOfChapters}
          </div>
        </div>
      </div>
    </Link>
  );
}
