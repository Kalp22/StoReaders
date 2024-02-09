import styles from "./reviews.module.css";

import { useState, useEffect } from "react";

import { MdSend } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

export default function Reviews({ storyId, story_name, reviewId }) {
  const user = localStorage.getItem("user");
  const [review, setReview] = useState("");
  const [reviewDeleteId, setReviewDeleteId] = useState("");
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}reviews/getAll`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            storyName: story_name,
          }),
        });

        const data = await res.json();
        if (data.message) {
          alert(data.message);
          return;
        }
        console.log(data.reviews);
        setReviews(data.reviews);
      } catch (err) {
        console.error(err.message);
      }
    };
    getReviews();
  }, []);

  const handleReview = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        alert("Please login to Review");
        return;
      }
      // Add review to the database
      if (!review) {
        alert("Please write a review");
        return;
      }
      const res = await fetch(`${process.env.API_URL}reviews/add`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: JSON.parse(user).id,
          storyId: storyId,
          storyName: story_name,
          content: review,
        }),
      });

      const data = await res.json();
      if (data.message !== "Review added") {
        alert(data.message);
        return;
      }
      // Add review to the reviews list
      setReviews([
        ...reviews,
        {
          _id: data.newReview._id,
          storyId: storyId,
          storyName: story_name,
          reviewer: JSON.parse(user).username,
          reviewDate: new Date().toJSON(),
          reviewContent: review,
        },
      ]);

      setReview("");
    } catch (err) {
      console.error(err.message);
    }
  };

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
          userId: JSON.parse(user).id,
          storyId: storyId,
          reviewId: reviewDeleteId,
        }),
      });

      const data = await res.json();

      if (data.message !== "Review deleted") {
        alert(data.message);
        return;
      }
      if (data.status) {
        const newReviews = reviews.filter((rev) => rev._id !== reviewDeleteId);
        setReviews(newReviews);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleForm = () => {
    const form = document.getElementById("form");
    form.classList.toggle(styles.show);
  };

  return (
    <>
      <div className={styles.head}>
        <div className={styles.title}>Reviews</div>
        <button className={styles.button} onClick={toggleForm}>
          Add a Review
        </button>
      </div>
      <div id="form" className={styles.hide}>
        <form className={styles.review_form}>
          <textarea
            name="add Review"
            placeholder="Add a Review..."
            onChange={(e) => {
              setReview(e.target.value);
            }}
            value={review}
          ></textarea>
          <button onClick={handleReview}>
            <p>Submit</p>
            <MdSend size={25} className={styles.send_button} />
          </button>
        </form>
      </div>
      <div className={styles.reviews_cover}>
        {reviews &&
          reviews.map((rev, i) => {
            return (
              <div key={i} id={`Card${i}`} className={styles.review_card}>
                <header className={styles.head}>
                  <div>
                    <div>
                      <FaUserCircle className={styles.user_icon} size={35} />
                    </div>
                    <div className={styles.user_name}>{rev.reviewer}</div>
                    <div className={styles.date}>
                      {rev.reviewDate.slice(0, 10)}
                    </div>
                  </div>
                  <div>
                    {JSON.parse(user) && rev.reviewer === JSON.parse(user).username && (
                      <HiDotsVertical
                        id={`Dots${i}`}
                        size={25}
                        className={styles.dots}
                        onMouseOver={() => {
                          setReviewDeleteId(rev._id);
                        }}
                        onClick={() => {
                          const dots = document.getElementById(`Dots${i}`);
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
                  <p>{rev.reviewContent}</p>
                </div>
              </div>
            );
          })}
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
    </>
  );
}
