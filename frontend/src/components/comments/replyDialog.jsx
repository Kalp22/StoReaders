import React from "react";

import styles from "./comments.module.css";

import { MdSend } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const ReplyDialog = ({
  coordinates,
  commentId,
  handleReply,
  reply,
  setReply,
}) => {
  return (
    <dialog
      id="replyDialog"
      className={styles.reply_dialog}
      style={{
        top: `${Math.abs(coordinates.top) + 20}px`,
        left: `${Math.abs(coordinates.left) + 20}px`,
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
  );
};

export default ReplyDialog;
