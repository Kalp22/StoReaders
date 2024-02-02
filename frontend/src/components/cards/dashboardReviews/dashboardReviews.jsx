import styles from "./dashboardReviews.module.css";

export default function DashboardReviews({ storyName, reviewDate, review}) {
  console.log(storyName, reviewDate, review);
  return (
    <div className={styles.comment_wrapper}>
      <div className={styles.comment_head}>
        <span>Story Name</span>
        <div className={styles.comment_chapter}>
          <div className={styles.comment_chapter_title}>Chapter</div>
          <p>100</p>
        </div>
      </div>
      <div className={styles.comment_details}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing
      </div>
    </div>
  );
}
