import styles from "./storyCard.module.css";

import { Nunito } from "next/font/google";
import { Open_Sans } from "next/font/google";

import Genre from "../../genre/genre";

import Link from "next/link";

const nunito = Nunito({
  weight: ["variable"],
  subsets: ["latin"],
});
const open_sans = Open_Sans({
  weight: ["variable"],
  subsets: ["latin"],
});

export default function StoryCard({ descript, story }) {
  const storyRoute = story.storyName.replace(/\s/g, "-");

  return (
    <Link href={`/story/${storyRoute}`} className={styles.card_wrapper}>
      <div className={styles.head_wrapper}>
        <div className={styles.name_wrapper}>
          <p className={`${styles.story_name} ${nunito.className}`}>
            {story.storyName}
          </p>
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
        <div className={`${styles.story_description} ${open_sans.className}`}>
          {story.description}
        </div>
      )}
    </Link>
  );
}
