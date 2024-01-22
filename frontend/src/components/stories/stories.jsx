import styles from "./stories.module.css";

import StoryCard from "../cards/story/storyCard";

import { useState, useEffect } from "react";

export default function StoriesComponent({ description }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.API_URL}stories/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStories(data.storyBasicInfo);
      });
  }, []);

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
        {stories &&
          stories.map((story, i) => (
            <StoryCard descript={descript} story={story} key={i} />
          ))}
      </div>
    </div>
  );
}
