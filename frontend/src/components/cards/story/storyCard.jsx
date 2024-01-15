import styles from "./storyCard.module.css";

import Genre from "../../genre/genre";

export default function StoryCard({ descript }) {
  const description = descript;

  if (description) {
    return (
      <div className={styles.card_wrapper}>
        <div className={styles.head_wrapper}>
          <div className={styles.name_wrapper}>
            <div className={styles.story_name}>Story Name</div>
            <div className={styles.name_underline}></div>
          </div>
          <div className={styles.genres_wrapper}>
            <Genre />
            <Genre />
            <Genre />
            <Genre />
          </div>
        </div>
        <div className={styles.story_description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          sapiente quod ab perspiciatis, ad distinctio, facilis similique
          maiores, voluptatum nam deleniti quas quos quibusdam pariatur tenetur
          itaque unde quis? Deserunt quo impedit maiores labore? Ducimus quaerat
          nam id ut fugiat, sit necessitatibus earum fuga inventore nostrum
          corporis. Est, quidem possimus.
        </div>
      </div>
    );
  }
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.head_wrapper}>
        <div className={styles.name_wrapper}>
          <div className={styles.story_name_alt}>Story Name</div>
          <div className={styles.name_underline}></div>
        </div>
        <div className={styles.genres_wrapper}>
          <Genre />
          <Genre />
          <Genre />
          <Genre />
        </div>
      </div>
    </div>
  );
}
