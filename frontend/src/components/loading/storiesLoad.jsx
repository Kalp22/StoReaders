import styles from "@/components/stories/stories.module.css";
import styles2 from "./storiesLoad.module.css";

export default function StoriesLoad() {
  return (
    <div className={styles.stories_wrapper}>
      <div>
        <div>
          <div className={styles.stories_text}>Stories</div>
          <div className={styles.story_arrow}></div>
        </div>
        <div className={styles.stories_line}></div>
      </div>
      <div className={styles.stories_cards_wrapper}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`${styles2.stories_load_item} ${styles2.animate_pulse}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
