import styles from "./dashboardReviews.module.css";

import Link from "next/link";

export default function DashboardReviews({ storyName, reviewDate, review }) {
  const storyId = storyName && storyName.replace(/\s/g, "-");
  
  return (
    <Link href={`/story/${storyId}`} className={styles.comment_wrapper}>
      <div className={styles.comment_head}>
        <span>{storyName}</span>
        <div className={styles.comment_chapter}>
          <div className={styles.comment_chapter_title}>
            {reviewDate && reviewDate.slice(0, 10)}
          </div>
        </div>
      </div>
      <div className={styles.comment_details}>{review}</div>
    </Link>
  );
}
