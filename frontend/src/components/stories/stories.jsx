import styles from "./stories.module.css";

import StoryCard from "../cards/story/storyCard";

export default function StoriesComponent({ description, data }) {
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
        {data &&
          data.story.map((story, i) => (
            <StoryCard descript={descript} story={story} key={i} />
          ))}
      </div>
    </div>
  );
}
