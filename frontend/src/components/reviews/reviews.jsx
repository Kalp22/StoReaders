import styles from "./reviews.module.css";

import ReviewCard from "../cards/review/reviewCard";

import { MdSend } from "react-icons/md";

export default function Reviews() {
    const toggleForm = () => {
        const form = document.getElementById("form");
        form.classList.toggle(styles.show);
    };
  return (
    <>
      <div className={styles.head}>
        <div className={styles.title}>Reviews</div>
        <button className={styles.button} onClick={toggleForm}>Add a Review</button>
      </div>
      <div id="form" className={styles.hide}>
        <form className={styles.review_form}>
          <textarea name="add Review" placeholder="Add a Review..."></textarea>
          <button>
            <p>Submit</p>
            <MdSend size={25} className={styles.send_button} />
          </button>
        </form>
      </div>
      <div className={styles.reviews_cover}>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </>
  );
}
