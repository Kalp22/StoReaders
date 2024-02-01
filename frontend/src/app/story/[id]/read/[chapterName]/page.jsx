"use client";
import styles from "./page.module.css";

import DarkLight from "@/components/ui/darklight/page";
import Comments from "@/components/comments/comments";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function chapterRead({ params: { id, chapterName } }) {
  const router = useRouter();

  const storyName = id.replace(/-/g, " ");
  const chapter_name = chapterName.replace(/-/g, " ");

  const user = JSON.parse(localStorage.getItem("user"));
  const [chapter, setChapter] = useState({
    _id: "",
    storyId: "",
    storyName: "",
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
          userId: user.id,
          chapterName: chapter_name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.chapter == null) {
            router.push(`/story/${id}`);
          }
          if (data.chapter.storyName != storyName) {
            router.push(`/story/${id}`);
          }
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
        <div className={styles.story_name}>{chapter.storyName}</div>
        <div className={styles.chapter_info}>
          <div>
            Chapter Number {chapter.chapterNumber && chapter.chapterNumber} :
          </div>
          <div>{chapter_name}</div>
        </div>
        <div className={styles.content}>
          {chapter.chapterContent &&
            chapter.chapterContent.split("\n").map((para, i) => {
              return (
                <p key={i} className={styles.paragraph}>
                  {para}
                </p>
              );
            })}
        </div>
      </div>
      <Comments chapterId={chapter._id} comments={chapter.comments} />
    </div>
  );
}
