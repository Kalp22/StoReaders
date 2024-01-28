"use client";
import styles from "./page.module.css";

import DarkLight from "@/components/ui/darklight/page";

import { FaComments } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

import { useEffect, useState } from "react";

export default function Read({ params: { id, chapterName } }) {
  const [commentsToggle, setCommentsToggle] = useState(true);
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

  const toggleComments = () => {
    setCommentsToggle(!commentsToggle);
  };

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
      <div
        id="commentsButton"
        className={
          commentsToggle ? styles.comments_button2 : styles.comments_button
        }
        onClick={toggleComments}
      >
        {commentsToggle ? (
          <IoCloseOutline size={25} />
        ) : (
          <FaComments size={35} />
        )}
      </div>
      <div
        className={
          commentsToggle ? styles.comments_container : styles.no_display
        }
      >
        <div className={styles.comments_header}>
          <div className={styles.comments_title}>Comments</div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.comments}>
          {chapter.comments &&
            chapter.comments.map((comment, i) => {
              return (
                <div key={i} className={styles.comment}>
                  <div className={styles.commentator}>
                    {comment.commentator}
                  </div>
                  <div className={styles.comment_content}>
                    {comment.commentContent}
                  </div>
                  <div className={styles.replies}>
                    {comment.replies &&
                      comment.replies.map((reply, i) => {
                        return (
                          <div key={i} className={styles.reply}>
                            <div className={styles.commentator}>
                              {reply.commentator}
                            </div>
                            <div className={styles.comment_content}>
                              {reply.commentContent}
                            </div>
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
