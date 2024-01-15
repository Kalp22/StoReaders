import styles from "./stories.module.css";

import StoryCard from "../cards/story/storyCard";

export default function StoriesComponent({ description }) {
  const descript = description;

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
        <StoryCard descript={descript} />
        <StoryCard descript={descript} />
        <StoryCard descript={descript} />
        <StoryCard descript={descript} />
        <StoryCard descript={descript} />
        <StoryCard descript={descript} />
      </div>
    </div>
  );
}
