import styles from "./dashboardReviews.module.css";

import { Nunito } from "next/font/google";
import { Roboto } from "next/font/google";

import Link from "next/link";

const nunito = Nunito({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

// Function to calculate time difference and return formatted string
const getTimeDifference = (dateAdded) => {
  const currentDate = new Date();
  const reviewDate = new Date(dateAdded);
  const timeDifference = currentDate - reviewDate;

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
        return reviewDate.toLocaleDateString(undefined, options);
      }
    }
  }
};

export default function DashboardReviews({ storyName, reviewDate, review }) {
  const storyId = storyName && encodeURIComponent(storyName);

  return (
    <Link href={`/story/${storyId}#reviews`} className={styles.review_wrapper}>
      <div className={styles.review_head}>
        <span className={nunito.className}>{storyName}</span>
        <div className={styles.review_chapter}>
          <div className={styles.review_date}>
            {getTimeDifference(reviewDate)}
          </div>
        </div>
      </div>
      <p className={`${styles.review_details} ${roboto.className}`}>{review}</p>
    </Link>
  );
}
