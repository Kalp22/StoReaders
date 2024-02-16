import React from "react";
import styles from "./comments.module.css";

const MoreDialog = ({ moreCoordinates, copyText, canDelete, handleDelete }) => {
  return (
    <dialog
      id="moreDialog"
      style={{
        position: "fixed",
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
  );
};

export default MoreDialog;
