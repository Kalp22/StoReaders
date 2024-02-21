import styles from "./rating.module.css";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
require("dotenv").config();

export default function Rating({ storyId }) {
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    const fetchRatings = () => {
      if (localStorage.getItem("user") == null) return;

      const user = JSON.parse(localStorage.getItem("user"));
      let rate = 0;

      if (user.rating) {
        user.rating.forEach((rating) => {
          if (rating.storyId === storyId) {
            rate = rating.rating;
          }
        });
      }

      return rate;
    };

    const rate = fetchRatings();
    setRatings(rate);
  }, [storyId]); // Include storyId in dependency array

  async function Rater(rating) {
    try {
      if (localStorage.getItem("user") == null) {
        toast.warning("Please login to rate the story");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));

      let rates = [];

      if (user.rating) {
        rates = user.rating.map((rate) => {
          if (rate.storyId == storyId) {
            rate.rating = rating;
          }
          return rate;
        });
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}ratings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          storyId: storyId,
          rating: rating,
        }),
      });

      const data = await res.json();

      if (data) {
        const rates = user.rating || []; // Retrieve existing ratings or set to an empty array
        const updatedRatings = rates.map((rate) => {
          if (rate.storyId === storyId) {
            return { ...rate, rating: rating };
          }
          return rate;
        });

        const existingRating = updatedRatings.find(
          (rate) => rate.storyId === storyId
        );

        if (!existingRating) {
          // If the story hasn't been rated before, add a new object
          updatedRatings.push({ storyId: storyId, rating: rating });
        }

        user.rating = updatedRatings;
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Rating added");
        setRatings(rating);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <div className={styles.rate_story}>Rate The Story</div>
      <div>
        {[...Array(5)].map((_, i) =>
          i < ratings ? (
            <FaStar
              key={i}
              className={styles.rating_star}
              onClick={() => {
                Rater(i + 1);
              }}
            />
          ) : (
            <FaRegStar
              key={i}
              className={styles.rating_star}
              onClick={() => {
                Rater(i + 1);
              }}
            />
          )
        )}
      </div>
    </>
  );
}
