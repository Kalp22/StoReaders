import React, { forwardRef } from "react";

import styles from "./comments.module.css";

import SpinnerLoad from "../loading/spinnerLoad";

import { FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineReply } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";

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
        {comments &&
          comments.map((comment, i) => (
            <div key={comment._id} className={styles.comment_container}>
              <div className={styles.comment_wrapper}>
                <div className={styles.comment_icon}>
                  <FaUserCircle size={30} />
                </div>
                <div className={styles.comment_text}>
                  <div className={styles.commentator}>
                    {comment.commentator}
                  </div>
                  <div className={styles.comment_content}>
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
                          {reply.commentator}
                        </div>
                        <div className={styles.comment_content}>
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
          ))}
        {!isLastPage ? <SpinnerLoad comments={true} /> : ""}
      </div>
    );
  }
);

export default CommentsDisplay;
