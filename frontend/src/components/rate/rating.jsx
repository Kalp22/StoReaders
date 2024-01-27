import styles from "./rating.module.css";

import { useState, useEffect } from "react";

import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export default function Rating({ storyId }) {
  const [ratings, setRatings] = useState(0);
  const [User, setUser] = useState({});

  function getRatings(storyId) {
    try {
      console.log(storyId);
      if (localStorage.getItem("user") == null) return;
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      let rates;
      if (User) {
        if (User.rating) {
          rates = User.rating.map((rating) => {
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
      setUser(user);
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
          user.rating = rating;
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
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
