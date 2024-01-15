import styles from "./storyAlternate.module.css";

export default function StoryAlternate() {
  return (
    <div className={styles.story_wrapper}>
      <div className={styles.name_wrap}>
        <div className={styles.story_name}>Story Name</div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.story_details}>
        <div className={styles.all_wrapper}>
          <div className={styles.all_titles}>Status</div>
          <div className={styles.all_values}>Completed</div>
        </div>
        <div className={styles.all_wrapper}>
          <div className={styles.all_titles}>Chapters Read</div>
          <div className={styles.all_values}>0</div>
        </div>
        <div className={styles.all_wrapper}>
          <div className={styles.all_titles}>Latest Chapter</div>
          <div className={styles.all_values}>100</div>
        </div>
      </div>
    </div>
  );
}
