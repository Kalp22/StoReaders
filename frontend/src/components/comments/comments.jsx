import styles from "./comments.module.css";

import { useState, useEffect } from "react";

import { FaUserCircle } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { MdSend } from "react-icons/md";

export default function Comments({
  storyName,
  chapterName,
  chapterId,
  comments,
}) {
  const [commentsToggle, setCommentsToggle] = useState(true);

  const toggleComments = () => {
    setCommentsToggle(!commentsToggle);
  };
  return (
    <>
      <div
        id="commentsButton"
        className={
          commentsToggle ? styles.comments_button2 : styles.comments_button
        }
        onClick={toggleComments}
      >
        {commentsToggle ? (
          <IoCloseOutline size={30} />
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
          {comments &&
            comments.map((comment, i) => {
              return (
                <div key={i} className={styles.comment}>
                  <div className={styles.comment_icon}>
                    <FaUserCircle size={30} />
                  </div>
                  <div className={styles.comment_text}>
                    <div className={styles.commentator}>
                      {comment.commentator}
                    </div>
                    <div className={styles.comment_content}>
                      {comment.commentContent}
                    </div>
                  </div>
                  <div className={styles.replies}>
                    {comment.replies &&
                      comment.replies.map((reply, i) => {
                        return (
                          <div key={i} className={styles.comment}>
                            <div className={styles.comment_icon}>
                              <FaUserCircle size={25} />
                            </div>
                            <div className={styles.comment_text}>
                              <div className={styles.commentator}>
                                {reply.commentator}
                              </div>
                              <div className={styles.comment_content}>
                                {reply.commentContent}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
        <div className={styles.add_comment}>
          <div className={styles.line}></div>
          <form className={styles.comment_form}>
            <input type="text" placeholder="Add a comment..."></input>
            <MdSend size={25} className={styles.send_button} />
          </form>
        </div>
      </div>
    </>
  );
}
