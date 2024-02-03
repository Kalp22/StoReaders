"use client";
import styles from "./latestChapter.module.css";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LatestStory() {
  const [latestStoryName, setLatestStoryName] = useState("");
  useEffect(() => {
    try {
      fetch(`${process.env.API_URL}stories/getLatest`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLatestStoryName(data.storyName);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  return (
    <Link
      href={`/story/${latestStoryName.replace(/\s/g, "-")}`}
      className={styles.latest_chapter_wrapper}
    >
      <div className={styles.latest_chapter_cover}>
        <div className={styles.latest_text}>Latest Story :</div>
        <div className={styles.chapter_name}>{latestStoryName}</div>
      </div>
    </Link>
  );
}
