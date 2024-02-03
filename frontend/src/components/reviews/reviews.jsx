import styles from "./reviews.module.css";

import ReviewCard from "../cards/review/reviewCard";

import { useState } from "react";

import { MdSend } from "react-icons/md";

export default function Reviews({ storyId, story_name, reviews }) {
  const user = localStorage.getItem("user");
  const [review, setReview] = useState("");

  const handleReview = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        alert("Please login to comment");
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
      if (data.message) {
        alert(data.message);
        return;
      }
      // Add review to the reviews list
      reviews.push(data.updatedReview);

      setReview("");
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
          reviews.map((review, i) => {
            return (
              <ReviewCard
                key={i}
                storyId={storyId}
                id={review._id}
                content={review.reviewContent}
                date={review.reviewDate}
                reviewer={review.reviewer}
              />
            );
          })}
      </div>
    </>
  );
}
