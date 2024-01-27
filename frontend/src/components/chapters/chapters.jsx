import { useState, useEffect } from "react";

import styles from "./chapters.module.css";

import Chapter from "../cards/chapter/chapter";

export default function Chapters({ id, story_name }) {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    try {
      fetch(`${process.env.API_URL}chapters/getAll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storyId: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(id);
          console.log(data);
          setChapters(data.chapters);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={styles.chapters_wrapper}>
      <div>
        <div className={styles.chapters_text}>Chapters</div>
      </div>
      <ul className={styles.chapters_list}>
        {chapters &&
          chapters.map((chapter, i) => {
            return (
              <Chapter chapter={chapter} story_name={story_name} key={i} />
            );
          })}
      </ul>
    </div>
  );
}
