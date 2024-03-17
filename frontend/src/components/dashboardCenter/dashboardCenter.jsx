import styles from "./dashboardCenter.module.css";

import { useState, useEffect } from "react";

import StoryAlternate from "../cards/storyAlternate/storyAlternate";
import DashboardReviews from "../cards/dashboardReviews/dashboardReviews";
import SpinnerLoad from "../loading/spinnerLoad";
require("dotenv").config();

export default function DashboardCenter({ readStories, reviews, user }) {
  const storyIds = readStories.map((story) => story.storyId);
  const reviewIds = reviews.map((review) => review.reviewId);
  const [stories, setStories] = useState([
    {
      storyName: "",
      totalNoOfChapters: 0,
      status: true,
    },
  ]);
  const [userReviews, setReviews] = useState([{}]);
  const [storiesLoading, setStoriesLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchStories = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}stories/getReadStories`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              storyIds,
            }),
          }
        );
        const data = await res.json();
        if (!data.status) return console.log(data.message);
        setStories(data.stories);
        setStoriesLoading(false);
      };
      fetchStories();
    } catch (e) {
      console.log(e.message);
    }
  }, [readStories]);

  useEffect(() => {
    try {
      const fetchReviews = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}reviews/getUserReviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              reviewIds,
            }),
          }
        );
        const data = await res.json();

        if (!data.status) return console.log(data.message);
        setReviews(data.reviews);
        setReviewsLoading(false);
      };

      fetchReviews();
    } catch (e) {
      console.log(e.message);
    }
  }, [reviews]);

  return (
    <div className={styles.dashboard_center}>
      <div className={styles.component}>
        <div className={styles.titles}>Stories Read</div>
        <div
          className={`${
            !storiesLoading ? styles.stories_cover : styles.stories_cover2
          }`}
        >
          {storiesLoading ? (
            <SpinnerLoad comments={true} />
          ) : (
            <>
              {readStories.length != 0 ? (
                stories &&
                stories.map((story, i) => {
                  return (
                    <StoryAlternate
                      key={i}
                      story={story}
                      readChapters={readStories[i].noOfChapters}
                    />
                  );
                })
              ) : (
                <div className={styles.nothing}>No stories read yet</div>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.component}>
        <div className={styles.titles}>Your Reviews</div>
        <div className={`${reviewsLoading ? styles.reviews_cover : ""}`}>
          {reviewsLoading ? (
            <SpinnerLoad comments={true} />
          ) : (
            <>
              {userReviews.length != 0 ? (
                userReviews &&
                userReviews.map((review, i) => {
                  return (
                    <DashboardReviews
                      key={i}
                      storyName={review.storyName}
                      reviewDate={review.reviewDate}
                      review={review.reviewContent}
                    />
                  );
                })
              ) : (
                <div className={styles.nothing}>You haven't reviewed yet</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
