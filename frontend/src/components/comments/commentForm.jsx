import React from "react";

import styles from "./comments.module.css";

import { MdSend } from "react-icons/md";

const CommentForm = ({ handleComment, comment, setComment }) => {
  return (
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
  );
};

export default CommentForm;
