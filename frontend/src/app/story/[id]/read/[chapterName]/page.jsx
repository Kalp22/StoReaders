"use client";
import styles from "./page.module.css";

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
    <div className={styles.read_wrapper}>
      <div>{id}</div>
      <div>
        <div>{chapter.chapterNumber}</div>
        <div>{chapterName}</div>
      </div>
      <div>
        <div>{chapter.chapterContent}</div>
        <div>
          {chapter.comments &&
            chapter.comments.map((comment, i) => {
              return (
                <div key={i}>
                  <div>{comment.commentator}</div>
                  <div>{comment.commentContent}</div>
                  <div>
                    {comment.replies &&
                      comment.replies.map((reply, i) => {
                        return (
                          <div key={i}>
                            <div>{reply.commentator}</div>
                            <div>{reply.commentContent}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
