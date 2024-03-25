import React, { forwardRef } from "react";

import styles from "./comments.module.css";

import { Roboto } from "next/font/google";

import SpinnerLoad from "../loading/spinnerLoad";

import { FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineReply } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

// Function to calculate time difference and return formatted string
const getTimeDifference = (dateAdded) => {
  const currentDate = new Date();
  const commentDate = new Date(dateAdded);
  const timeDifference = currentDate - commentDate;

  // Calculate seconds, minutes, and hours
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);

  if (hoursDifference < 1) {
    // Comment added within the last hour
    return `${minutesDifference}m`;
  } else if (hoursDifference <= 6) {
    // Comment added within the last 6 hours
    return `${hoursDifference}h`;
  } else if (hoursDifference < 24) {
    // Comment added today
    return "Today";
  } else {
    // Calculate days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 1) {
      // Comment added yesterday
      return "1D";
    } else if (daysDifference < 30) {
      // Comment added within the last month
      return `${daysDifference}D`;
    } else {
      // Calculate months
      const monthsDifference = Math.floor(daysDifference / 30);

      if (monthsDifference < 12) {
        // Comment added within the last year
        return `${monthsDifference}Month`;
      } else {
        // Comment added more than a year ago, display the date itself
        const options = { year: "numeric", month: "long", day: "numeric" };
        return commentDate.toLocaleDateString(undefined, options);
      }
    }
  }
};

const CommentsDisplay = forwardRef(
  (
    {
      comments,
      commentReplies,
      coordinates,
      moreCoordinates,
      commentId,
      deleteId,
      canDelete,
      commentator,
      content,
      getReplies,
      checkCanDelete,
      copyText,
      isLastPage,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={styles.comments} id="commentsDisplay">
        {comments && comments.length != 0 ? (
          comments.map((comment, i) => (
            <div key={comment._id} className={styles.comment_container}>
              <div className={styles.comment_wrapper}>
                <div className={styles.comment_icon}>
                  <FaUserCircle size={30} />
                </div>
                <div className={styles.comment_text}>
                  <div className={styles.commentator}>
                    <div>{comment.commentator}</div>
                    <div>{getTimeDifference(comment.dateAdded)}</div>
                  </div>
                  <div
                    className={`${styles.comment_content} ${roboto.className}`}
                  >
                    {comment.commentContent.split("\n").map((text, i) => {
                      return (
                        <p key={i}>
                          {text}
                          <br />
                        </p>
                      );
                    })}
                  </div>
                  <div className={styles.comment_actions}>
                    <MdOutlineReply
                      id={`replyButton${i}`}
                      size={25}
                      className={styles.action_buttons}
                      onClick={() => {
                        var reply = document.querySelector(`#replyButton${i}`);
                        let ordinates = reply.getBoundingClientRect();
                        coordinates({
                          top: ordinates.top,
                          left: ordinates.left,
                        });
                        commentId(comment._id);
                        const dialog = document.querySelector("dialog");
                        dialog.showModal();
                      }}
                    />
                    <HiDotsHorizontal
                      id={`moreButton${i}`}
                      size={20}
                      className={styles.action_buttons}
                      onMouseOver={() => commentator(comment.commentator)}
                      onClick={() => {
                        content(comment.commentContent);
                        var reply = document.querySelector(`#moreButton${i}`);
                        let cordinates = reply.getBoundingClientRect();
                        moreCoordinates({
                          top: cordinates.top,
                          left: cordinates.left,
                        });
                        deleteId({ isComment: true, id: comment._id });
                        checkCanDelete();
                      }}
                    />
                  </div>
                  {comment.replyId && comment.replyId.length > 0 ? (
                    <div
                      className={styles.view_replies}
                      onClick={() => {
                        getReplies(comment._id, i);
                      }}
                    >
                      <FaCaretDown
                        size={20}
                        className={`${styles.caret_down} ${
                          comment.showReplies ? styles.rotate : ""
                        }`}
                      />
                      View Replies
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {commentReplies[comment._id] && comment.showReplies && (
                <div className={styles.replies}>
                  {commentReplies[comment._id].map((reply, j) => (
                    <div key={j} className={styles.comment_wrapper}>
                      <div className={styles.comment_icon}>
                        <FaUserCircle size={30} />
                      </div>
                      <div className={styles.comment_text}>
                        <div className={styles.commentator}>
                          <div>{reply.commentator}</div>
                          <div>{getTimeDifference(reply.dateAdded)}</div>
                        </div>
                        <div
                          className={`${styles.comment_content} ${roboto.className}`}
                        >
                          {reply.commentContent.split("\n").map((text, i) => (
                            <p key={i}>
                              {text}
                              <br />
                            </p>
                          ))}
                        </div>
                        <div className={styles.comment_actions}>
                          <MdOutlineReply
                            id={`reply_button${j}`}
                            size={25}
                            className={styles.action_buttons}
                            onClick={() => {
                              const reply = document.querySelector(
                                `#reply_button${j}`
                              );
                              const ordinates = reply.getBoundingClientRect();
                              coordinates({
                                top: ordinates.top,
                                left: ordinates.left,
                              });
                              commentId(comment._id);
                              const dialog = document.querySelector("dialog");
                              dialog.showModal();
                            }}
                          />
                          <HiDotsHorizontal
                            id={`more_button${j}`}
                            size={20}
                            className={styles.action_buttons}
                            onMouseOver={() => commentator(reply.commentator)}
                            onClick={() => {
                              content(reply.commentContent);
                              const replyElement = document.querySelector(
                                `#more_button${j}`
                              );
                              const ordinates =
                                replyElement.getBoundingClientRect();
                              moreCoordinates({
                                top: ordinates.top,
                                left: ordinates.left,
                              });
                              deleteId({
                                isComment: false,
                                id: reply._id,
                                commentId: comment._id,
                              });
                              checkCanDelete();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.no_comments}>No comments yet</div>
        )}
        {!isLastPage ? (
          <div className={styles.spin_cover}>
            <SpinnerLoad comments={true} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
);

export default CommentsDisplay;
