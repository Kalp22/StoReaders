import styles from "./reviewCard.module.css";

import { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

export default function ReviewCard({ storyId, id, content, date, reviewer }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        alert("Please login to delete review");
        return;
      }

      const res = await fetch(`${process.env.API_URL}reviews/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          storyId: storyId,
          reviewId: id,
        }),
      });

      const data = await res.json();

      if (data.message !== "Review deleted") {
        alert(data.message);
        return;
      }
      if (data.status) {
        const review = document.getElementById(`${id}Card`);
        review.remove();
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div id={`${id}Card`} className={styles.review_card}>
      <header className={styles.head}>
        <div>
          <div>
            <FaUserCircle className={styles.user_icon} size={35} />
          </div>
          <div className={styles.user_name}>{reviewer}</div>
          <div className={styles.date}>{date.slice(0, 10)}</div>
        </div>
        <div>
          {reviewer === user.username && (
            <HiDotsVertical
              id={`${id}`}
              size={25}
              className={styles.dots}
              onClick={() => {
                const dots = document.getElementById(id);
                const rect = dots.getBoundingClientRect();
                setCoordinates({ top: rect.top, left: rect.left });
                const dialog = document.querySelector("dialog");
                dialog.showModal();
              }}
            />
          )}
        </div>
      </header>
      <div className={styles.content}>
        <p>{content}</p>
      </div>
      <dialog
        id="dialog"
        style={{
          position: "fixed",
          color: "var(--text-color)",
          backgroundColor: "var(--chapter-list-background)",
          left: `${Math.abs(coordinates.left) + 20}px`,
          top: `${Math.abs(coordinates.top) + 20}px`,
          border: "1px solid var(--line-color)",
          borderRadius: "10px",
          outline: "none",
        }}
        onClick={() => {
          const dialog = document.querySelector("dialog");
          dialog.close();
        }}
      >
        <div className={styles.delete} onClick={handleDelete}>
          Delete
        </div>
      </dialog>
    </div>
  );
}
