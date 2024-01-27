import styles from "./rating.module.css";

import { useState, useEffect } from "react";

import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export default function Rating({ storyId }) {
  const [ratings, setRatings] = useState(0);

  function getRatings(storyId) {
    try {
      console.log(storyId);
      if (localStorage.getItem("user") == null) return;
      const user = JSON.parse(localStorage.getItem("user"));
      let rates;
      if (user) {
        if (user.rating) {
          rates = user.rating.map((rating) => {
            if (rating.storyId == storyId) {
              return rating.rating;
            }
          });
        }
      }

      return rates;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    let rates = getRatings(storyId);
    if (rates) {
      setRatings(rates[0]);
    }
  }, []);

  async function Rater(rating) {
    try {
      if (localStorage.getItem("user") == null) {
        alert("Please login to rate");
        return;
      }
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.rating) {
        const rates = user.rating.map((rate) => {
          if (rate.storyId == storyId) {
            rate.rating = rating;
          }
          return rate;
        });
        const res = await fetch(`${process.env.API_URL}ratings`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            storyId: storyId,
            rating: rates.rating,
          }),
        });
        const data = await res.json();

        if (data) {
          setRatings(rating);
        }
      } else {
        const res = await fetch(`${process.env.API_URL}ratings`, {
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
          const rate = {
            storyId: storyId,
            rating: rating,
          };
          user.rating.push(rate);
          setRatings(rating);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={styles.rate_story}>Rate The Story</div>
      <div>
        <FaRegStar
          className={styles.rating_star}
          onClick={() => {
            Rater(1);
          }}
        />
        <FaRegStar
          className={styles.rating_star}
          onClick={() => {
            Rater(2);
          }}
        />
        <FaRegStar
          className={styles.rating_star}
          onClick={() => {
            Rater(3);
          }}
        />
        <FaRegStar
          className={styles.rating_star}
          onClick={() => {
            Rater(4);
          }}
        />
        <FaRegStar
          className={styles.rating_star}
          onClick={() => {
            Rater(5);
          }}
        />
      </div>
    </>
  );
}
