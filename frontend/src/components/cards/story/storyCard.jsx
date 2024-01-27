"use client";
import styles from "./storyCard.module.css";

import Genre from "../../genre/genre";

import { useRouter } from "next/navigation";

export default function StoryCard({ descript, story }) {
  const router = useRouter();

  function goToStory() {
    router.push(`/story/${story.storyName}`);
  }

  if (descript) {
    return (
      <div className={styles.card_wrapper} onClick={goToStory}>
        <div className={styles.head_wrapper}>
          <div className={styles.name_wrapper}>
            <div className={styles.story_name}>{story.storyName}</div>
            <div className={styles.name_underline}></div>
          </div>
          <div className={styles.genres_wrapper}>
            {story &&
              story.genre.map((genre, i) => {
                return <Genre genre={genre} index={i} key={i} />;
              })}
          </div>
        </div>
        <div className={styles.story_description}>{story.description}</div>
      </div>
    );
  }
  return (
    <div className={styles.card_wrapper} onClick={goToStory}>
      <div className={styles.head_wrapper}>
        <div className={styles.name_wrapper}>
          <div className={styles.story_name_alt}>{story.storyName}</div>
          <div className={styles.name_underline}></div>
        </div>
        <div className={styles.genres_wrapper}>
          {story &&
            story.genre.map((genre, i) => {
              return <Genre genre={genre} index={i} key={i} />;
            })}
        </div>
      </div>
    </div>
  );
}
