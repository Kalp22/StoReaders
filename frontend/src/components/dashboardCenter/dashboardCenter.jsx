import styles from "./dashboardCenter.module.css";

import StoryAlternate from "../cards/storyAlternate/storyAlternate";
import DashboardReviews from "../cards/dashboardReviews/dashboardReviews";

export default function DashboardCenter({ stories, user, reviews }) {
  return (
    <div className={styles.dashboard_center}>
      <div className={styles.component}>
        <div className={styles.titles}>Stories Read</div>
        <div className={styles.stories_cover}>
          {stories &&
            stories.map((story, i) => {
              const readChapters = user.readStories.find((readStory) => {
                if (readStory.storyId === story._id) {
                  return readStory.noOfChapters;
                }
              });
              return (
                <StoryAlternate
                  key={i}
                  story={story}
                  readChapters={readChapters ? readChapters.noOfChapters : 0}
                />
              );
            })}
        </div>
      </div>
      <div className={styles.component}>
        <div className={styles.titles}>Your Comments</div>
        <div>
          {reviews &&
            reviews.map((review, i) => {
              return (
                <DashboardReviews
                  key={i}
                  storyName={
                    user.reviews &&
                    user.reviews.find((reviews) => {
                      reviews.reviewId === review._id;
                    })
                  }
                  reviewDate={review.reviewDate}
                  review={review.reviewContent}
                />
              );
            })}
          <DashboardReviews />
        </div>
      </div>
    </div>
  );
}
