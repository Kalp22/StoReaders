import styles from "./swipCard.module.css";

import Image from "next/image";
import Link from "next/link";

import Genre from "@/components/genre/genre";

export default function SwipCard({ story, image }) {
  return (
    <div className={styles.main_story_wrapper}>
      <Link
        href={`/story/${story.storyName}`}
        className={styles.main_story_left}
      >
        <div className={styles.name_wrapper}>
          <div className={styles.main_name}>{story.storyName}</div>
          <div className={styles.name_underline}></div>
        </div>
        <div className={styles.genre_wrapper}>
          {story &&
            story.genre.map((genre, i) => {
              return <Genre genre={genre} key={i} />;
            })}
        </div>
        <div className={styles.main_description}>{story.description}</div>
      </Link>
      <div className={styles.main_story_right}>
        <Link href={`/story/${story.storyName}`}>
          <Image
            src={image}
            alt="story image"
            width={450}
            height={500}
            loading="lazy"
            className={styles.main_story_image}
          />
        </Link>
        {/* <div className={styles.arrows_wrapper}>
            <div className={styles.arrow_cover}>
              <div className={styles.left_arrow}></div>
            </div>
            <div className={styles.arrow_cover}>
              <div className={styles.right_arrow}></div>
            </div>
          </div> */}
      </div>
    </div>
  );
}
