import styles from "./reviews.module.css";

import { useState, useEffect } from "react";

import { MdSend } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { toast } from "sonner";
require("dotenv").config();

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
    // added within the last hour
    return `${minutesDifference} min`;
  } else if (hoursDifference <= 6) {
    // added within the last 6 hours
    return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""}`;
  } else if (hoursDifference < 24) {
    // added today
    return "Today";
  } else {
    // Calculate days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 1) {
      // added yesterday
      return "1 Day";
    } else if (daysDifference < 30) {
      // added within the last month
      return `${daysDifference} Days`;
    } else {
      // Calculate months
      const monthsDifference = Math.floor(daysDifference / 30);

      if (monthsDifference < 12) {
        // added within the last year
        return `${monthsDifference} Month${monthsDifference > 1 ? "s" : ""}`;
      } else {
        // added more than a year ago, display the date itself
        const options = { year: "numeric", month: "long", day: "numeric" };
        return commentDate.toLocaleDateString(undefined, options);
      }
    }
  }
};

export default function Reviews({ storyId, story_name, reviewId }) {
  const user = localStorage.getItem("user");
  const [review, setReview] = useState("");
  const [reviewDeleteId, setReviewDeleteId] = useState("");
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}reviews/getAll`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              storyName: story_name,
            }),
          }
        );

        const data = await res.json();
        if (data.message) {
          toast.error(data.message);
          return;
        }
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
        toast.warning("Please login to add a review");
        return;
      }
      // Add review to the database
      if (!review) {
        toast.warning("Please write a review");
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}reviews/add`, {
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
        if (data.message === "You have already reviewed this story") {
          toast.warning(data.message);
          setReview("");
          return;
        }
        toast.error(data.message);
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
      toast.success(data.message);

      const form = document.getElementById("form");
      form.classList.toggle(styles.show);

      setReview("");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        toast.warning("Please login to delete review");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}reviews/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: JSON.parse(user).id,
            storyId: storyId,
            reviewId: reviewDeleteId,
          }),
        }
      );

      const data = await res.json();

      if (data.message !== "Review deleted") {
        toast.error(data.message);
        return;
      }
      if (data.status) {
        const newReviews = reviews.filter((rev) => rev._id !== reviewDeleteId);
        toast.success(data.message);
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
                      {getTimeDifference(rev.reviewDate)}
                    </div>
                  </div>
                  <div>
                    {JSON.parse(user) &&
                      rev.reviewer === JSON.parse(user).username && (
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
                  {rev.reviewContent.split("\n").map((para, i) => {
                    return (
                      <p key={i} className={styles.paragraph}>
                        {para}
                      </p>
                    );
                  })}
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
            left: `${Math.abs(coordinates.left) - 60}px`,
            top: `${Math.abs(coordinates.top) + 30}px`,
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
