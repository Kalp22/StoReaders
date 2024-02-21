"use client";
import styles from "./latestChapter.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
require("dotenv").config();

export default function LatestStory() {
  const router = useRouter();
  const [latestStoryName, setLatestStoryName] = useState("");
  useEffect(() => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}stories/getLatest`, {
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
    <div className={styles.latest_chapter_wrapper}>
      <div
        className={styles.latest_chapter_cover}
        onClick={() =>
          router.push(`/story/${latestStoryName.replace(/\s/g, "-")}`)
        }
      >
        <div className={styles.latest_text}>Latest Story :</div>
        <div className={styles.chapter_name}>{latestStoryName}</div>
      </div>
    </div>
  );
}
