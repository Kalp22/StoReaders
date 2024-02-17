import styles from "./storyCard.module.css";

import Genre from "../../genre/genre";

import Link from "next/link";

export default function StoryCard({ descript, story }) {
  const storyRoute = story.storyName.replace(/\s/g, "-");

  return (
    <Link href={`/story/${storyRoute}`} className={styles.card_wrapper}>
      <div className={styles.head_wrapper}>
        <div className={styles.name_wrapper}>
          <div className={styles.story_name}>{story.storyName}</div>
          <div className={styles.name_underline}></div>
        </div>
        <div className={styles.genres_wrapper}>
          {story &&
            story.genre.map((genre, i) => {
              return i < 3 ? <Genre genre={genre} index={i} key={i} /> : "";
            })}
        </div>
      </div>
      {!descript ? (
        ""
      ) : (
        <div className={styles.story_description}>{story.description}</div>
      )}
    </Link>
  );
}
