import styles from "./swipCard.module.css";

import { Nunito } from "next/font/google";
import { Open_Sans } from "next/font/google";

import Image from "next/image";
import Link from "next/link";

import Genre from "@/components/genre/genre";

const nunito = Nunito({
  weight: ["variable"],
  subsets: ["latin"],
});
const open_sans = Open_Sans({
  weight: ["variable"],
  subsets: ["latin"],
});

export default function SwipCard({ story, image }) {
  return (
    <div className={styles.main_story_wrapper}>
      <Link
        href={`/story/${encodeURIComponent(story.storyName)}`}
        className={styles.main_story_left}
      >
        <div className={styles.name_wrapper}>
          <p className={`${styles.main_name} ${nunito.className}`}>
            {story.storyName}
          </p>
          <div className={styles.name_underline}></div>
        </div>
        <div className={styles.genre_wrapper}>
          {story &&
            story.genre.map((genre, i) => {
              return i < 3 ? <Genre genre={genre} key={i} /> : "";
            })}
        </div>
        <div className={`${styles.main_description} ${open_sans.className}`}>
          {story.description}
        </div>
      </Link>
      <div className={styles.main_story_right}>
        <Link href={`/story/${encodeURIComponent(story.storyName)}`}>
          <Image
            src={image}
            alt="story image"
            width={450}
            height={500}
            loading="lazy"
            className={styles.main_story_image}
            title={story.storyName}
          />
        </Link>
      </div>
    </div>
  );
}
