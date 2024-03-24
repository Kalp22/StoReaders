import { useState, useEffect } from "react";

import styles from "./chapters.module.css";

import { Raleway } from "next/font/google";

import Chapter from "../cards/chapter/chapter";
require("dotenv").config();

const raleway = Raleway({
  weight: ["variable"],
  subsets: ["latin"],
});

export default function Chapters({ id, story_name }) {
  const [chapters, setChapters] = useState([]);
  const [isChapter, setIsChapter] = useState(true);

  useEffect(() => {
    try {
      async function fetchData() {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}chapters/getAll`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              storyId: id,
            }),
          }
        );
        const data = await res.json();
        if (data.chapters.length === 0) {
          setIsChapter(false);
        } else {
          setChapters(data.chapters);
        }
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={styles.chapters_wrapper}>
      <div>
        <div className={styles.chapters_text}>Chapters</div>
      </div>
      {isChapter ? (
        <ul className={styles.chapters_list}>
          {chapters &&
            chapters.map((chapter, i) => {
              return (
                <Chapter chapter={chapter} story_name={story_name} key={i} />
              );
            })}
        </ul>
      ) : (
        <div className={`${styles.no_chapters} ${raleway.className}`}>
          Coming Soon
        </div>
      )}
    </div>
  );
}
