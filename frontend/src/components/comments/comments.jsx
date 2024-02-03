import styles from "./comments.module.css";

import { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineReply } from "react-icons/md";

export default function Comments({ chapterId, comments }) {
  // get user from local storage
  const user = localStorage.getItem("user");
  // to toggle comments section
  const [commentsToggle, setCommentsToggle] = useState(false);
  // to store comment and reply to be added
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  // to store coordinates of reply dialog
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  // to store coordinates of more dialog
  const [moreCoordinates, setMoreCoordinates] = useState({ top: 0, left: 0 });
  // to store comment id to add reply
  const [commentId, setCommentId] = useState("");
  // to store comment id to delete comment or reply
  const [deleteId, setDeleteId] = useState({
    isComment: true,
    id: "",
    commentId: "",
  });
  // to store if user can delete comment or reply
  const [canDelete, setCanDelete] = useState(false);
  // to store commentator of comment or reply to check if it can be deleted
  const [commentator, setCommentator] = useState("");
  // to store content of comment or reply to copy
  const [content, setContent] = useState("");

  // to handle adding comment
  const handleComment = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        alert("Please login to comment");
        return;
      }

      if (!comment) {
        alert("Please enter the comment");
        return;
      }

      const res = await fetch(`${process.env.API_URL}comments/add`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(user).token}`,
        },
        body: JSON.stringify({
          userId: JSON.parse(user).id,
          chapterId: chapterId,
          content: comment,
        }),
      });

      const data = await res.json();

      if (data.message) {
        alert(data.message);
        return;
      }

      comments.push({
        commentator: data.updatedComment.commentator,
        commentContent: data.updatedComment.commentContent,
      });

      setComment("");
    } catch (e) {
      console.log(e);
    }
  };

  // to handle adding reply
  const handleReply = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        alert("Please login to comment");
        return;
      }

      if (!reply) {
        alert("Please enter the comment");
        return;
      }

      const res = await fetch(`${process.env.API_URL}comments/reply/add`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(user).token}`,
        },
        body: JSON.stringify({
          userId: JSON.parse(user).id,
          chapterId: chapterId,
          commentId: commentId,
          content: reply,
        }),
      });

      const data = await res.json();

      if (data.message) {
        alert(data.message);
        const dialog = document.querySelector("dialog");
        dialog.close();
        return;
      }

      comments.forEach((comment) => {
        if (comment._id == commentId) {
          comment.replies.push({
            commentator: data.updatedReply.commentator,
            commentContent: data.updatedReply.commentContent,
          });
        }
      });

      setReply("");

      const dialog = document.querySelector("dialog");
      dialog.close();
    } catch (e) {
      console.log(e);
    }
  };

  // to handle deleting comment or reply
  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        alert("Please login to delete comment");
        return;
      }

      if (deleteId.isComment) {
        const res = await fetch(`${process.env.API_URL}comments/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(user).token}`,
          },
          body: JSON.stringify({
            userId: JSON.parse(user).id,
            chapterId: chapterId,
            commentId: deleteId.id,
          }),
        });

        const data = await res.json();

        if (data.message != "Comment deleted") {
          alert(data.message);
          const dialog = document.querySelector("#moreDialog");
          dialog.close();
          return;
        }

        comments.forEach((comment, i) => {
          if (comment._id == deleteId.id) {
            comments.splice(i, 1);
          }
        });

        const dialog = document.querySelector("#moreDialog");
        dialog.close();
      } else {
        const res = await fetch(`${process.env.API_URL}comments/reply/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(user).token}`,
          },
          body: JSON.stringify({
            userId: JSON.parse(user).id,
            chapterId: chapterId,
            commentId: deleteId.commentId,
            replyId: deleteId.id,
          }),
        });

        const data = await res.json();

        if (data.message != "Reply deleted") {
          alert(data.message);
          const dialog = document.querySelector("#moreDialog");
          dialog.close();
          return;
        }

        comments.forEach((comment, i) => {
          comment.replies.forEach((reply, j) => {
            reply._id == data.replyId && comment.replies.splice(j, 1);
          });
        });

        const dialog = document.querySelector("#moreDialog");
        dialog.close();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // to check if user can delete the comment or reply
  const checkCanDelete = () => {
    if (JSON.parse(user).username == commentator) {
      setCanDelete(true);
    } else {
      setCanDelete(false);
    }
    const dialog = document.querySelector("#moreDialog");
    dialog.showModal();
  };

  // to copy comment or reply
  const copyText = () => {
    navigator.clipboard.writeText(content);
    const dialog = document.querySelector("#moreDialog");
    dialog.close();
  };

  // to toggle comments section
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
                <div key={i} className={styles.comment_container}>
                  <div className={styles.comment_wrapper}>
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
                      <div className={styles.comment_actions}>
                        <MdOutlineReply
                          id={`replyButton${i}`}
                          size={25}
                          className={styles.action_buttons}
                          onClick={() => {
                            var reply = document.querySelector(
                              `#replyButton${i}`
                            );
                            let ordinates = reply.getBoundingClientRect();
                            setCoordinates({
                              top: ordinates.top,
                              left: ordinates.left,
                            });
                            setCommentId(comment._id);
                            const dialog = document.querySelector("dialog");
                            dialog.showModal();
                          }}
                        />
                        <HiDotsHorizontal
                          id={`moreButton${i}`}
                          size={20}
                          className={styles.action_buttons}
                          onMouseOver={() =>
                            setCommentator(comment.commentator)
                          }
                          onClick={() => {
                            setContent(comment.commentContent);
                            var reply = document.querySelector(
                              `#moreButton${i}`
                            );
                            let cordinates = reply.getBoundingClientRect();
                            setMoreCoordinates({
                              top: cordinates.top,
                              left: cordinates.left,
                            });
                            setDeleteId({ isComment: true, id: comment._id });
                            checkCanDelete();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {comment.replies && (
                    <div className={styles.replies}>
                      {comment.replies.map((reply, j) => {
                        return (
                          <div key={j} className={styles.comment_wrapper}>
                            <div className={styles.comment_icon}>
                              <FaUserCircle size={30} />
                            </div>
                            <div className={styles.comment_text}>
                              <div className={styles.commentator}>
                                {reply.commentator}
                              </div>
                              <div className={styles.comment_content}>
                                {reply.commentContent}
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
                                    const ordinates =
                                      reply.getBoundingClientRect();
                                    setCoordinates({
                                      top: ordinates.top,
                                      left: ordinates.left,
                                    });
                                    setCommentId(comment._id);
                                    const dialog =
                                      document.querySelector("dialog");
                                    dialog.showModal();
                                  }}
                                />
                                <HiDotsHorizontal
                                  id={`more_button${j}`}
                                  size={20}
                                  className={styles.action_buttons}
                                  onMouseOver={() =>
                                    setCommentator(reply.commentator)
                                  }
                                  onClick={() => {
                                    setContent(reply.commentContent);
                                    const replyElement = document.querySelector(
                                      `#more_button${j}`
                                    );
                                    const ordinates =
                                      replyElement.getBoundingClientRect();
                                    setMoreCoordinates({
                                      top: ordinates.top,
                                      left: ordinates.left,
                                    });
                                    setDeleteId({
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
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <div className={styles.add_comment}>
          <div className={styles.line}></div>
          <form className={styles.comment_form}>
            <textarea
              name="add comment"
              placeholder="Add a Comment..."
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            ></textarea>
            <MdSend
              size={25}
              className={styles.send_button}
              onClick={handleComment}
            />
          </form>
        </div>
      </div>
      <dialog
        id="replyDialog"
        style={{
          position: "absolute",
          color: "var(--text-color)",
          backgroundColor: "var(--chapter-list-background)",
          top: `${Math.abs(coordinates.top) + 20}px`,
          left: `${Math.abs(coordinates.left) + 20}px`,
          width: "410px",
          border: "1px solid var(--line-color)",
          borderRadius: "10px",
        }}
      >
        <form className={styles.reply_form}>
          <div className={styles.reply_header}>
            <div>Reply</div>
            <IoCloseOutline
              size={25}
              className={styles.close}
              onClick={() => {
                const dialog = document.querySelector("dialog");
                dialog.close();
              }}
            />
          </div>
          <textarea
            name="add comment"
            placeholder="Add a Comment..."
            onChange={(e) => {
              setReply(e.target.value);
            }}
            value={reply}
          ></textarea>
          <MdSend
            size={20}
            className={styles.reply_send_button}
            onClick={handleReply}
          />
        </form>
      </dialog>
      <dialog
        id="moreDialog"
        style={{
          position: "absolute",
          color: "var(--text-color)",
          backgroundColor: "var(--chapter-list-background)",
          top: `${Math.abs(moreCoordinates.top) + 20}px`,
          left: `${Math.abs(moreCoordinates.left) + 20}px`,
          width: "150px",
          border: "1px solid var(--line-color)",
          borderRadius: "10px",
          outline: "none",
        }}
        onClick={(e) => {
          const moreDialog = document.querySelector("#moreDialog");
          if (e.target == moreDialog) {
            moreDialog.close();
          }
        }}
      >
        <div className={styles.more_dialog}>
          <div className={styles.more_option} onClick={copyText}>
            Copy
          </div>
          {canDelete && (
            <div className={styles.more_option} onClick={handleDelete}>
              Delete
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
