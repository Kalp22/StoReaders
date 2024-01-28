"use client";
import styles from "./page.module.css";

import DarkLight from "@/components/ui/darklight/page";
import Comments from "@/components/comments/comments";

import { useEffect, useState } from "react";

export default function Read({ params: { id, chapterName } }) {
  const [chapter, setChapter] = useState({
    _id: "",
    storyId: "",
    chapterNumber: "",
    comments: [
      {
        commentator: "",
        commentContent: "",
        replies: [{ commentator: "", commentContent: "" }],
      },
    ],
  });

  useEffect(() => {
    try {
      fetch(`${process.env.API_URL}chapters/getOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chapterName: chapterName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setChapter(data.chapter);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={styles.read_container}>
      <div className={styles.read_wrapper}>
        <div className={styles.darklight}>
          <DarkLight />
        </div>
        <div className={styles.story_name}>{id}</div>
        <div className={styles.chapter_info}>
          <div>
            Chapter Number {chapter.chapterNumber && chapter.chapterNumber} :
          </div>
          <div>{chapterName}</div>
        </div>
        <div className={styles.content}>
          {chapter.chapterContent &&
            chapter.chapterContent.split("\n").map((para, i) => {
              return (
                <div key={i} className={styles.paragraph}>
                  {para}
                </div>
              );
            })}
        </div>
      </div>

      <Comments
        params={{
          id: id,
          chapterName: chapterName,
        }}
        comments={chapter.comments}
      />
    </div>
  );
}
