import styles from "./rating.module.css";

import { useState, useEffect } from "react";

import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export default function Rating({ storyId }) {
  const [ratings, setRatings] = useState(0);
  const [User, setUser] = useState({});

  useEffect(() => {
    let rates = (storyId) => {
      console.log(storyId);
      if (localStorage.getItem("user") == null) return;
      const user = JSON.parse(localStorage.getItem("user"));
      let rates;
      if (JSON.parse(user).rating) {
        rates = User.rating.map((ratings) => {
          if (ratings.storyId == storyId) {
            return ratings.rating;
          }
        });
      }
      setUser(user);

      return rates;
    };
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
      setUser(JSON.parse(localStorage.getItem("user")));
      console.log(User);
      if (User.rating) {
        const rates = User.rating.map((rate) => {
          if (rate.storyId == storyId) {
            rate.rating = rating;
          }
          return rate;
        });
        const res = await fetch(`${process.env.API_URL}ratings`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${User.token}`,
          },
          body: JSON.stringify({
            userId: User.id,
            storyId: storyId,
            rating: rates.rating,
          }),
        });
        const data = await res.json();

        if (data) {
          const rate = {
            storyId: storyId,
            rating: rating,
          };
          const ratings = [...User.rating, rate];
          User.rating = ratings;
          localStorage.setItem("user", JSON.stringify(User));
          setUser(User);
          setRatings(rating);
        }
      } else {
        const res = await fetch(`${process.env.API_URL}ratings`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${User.token}`,
          },
          body: JSON.stringify({
            userId: User.id,
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
          const rating = [...User.rating, rate];
          User.rating = rating;
          localStorage.setItem("user", JSON.stringify(User));
          setUser(User);
          setRatings(rating);
        }
      }
    } catch (err) {
      console.log(err);
    }
    console.log(User);
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
              onClick={async () => {
                await Rater(i + 1);
              }}
            />
          )
        )}
      </div>
    </>
  );
}
