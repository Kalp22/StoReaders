import styles from "./commentsLoad.module.css";

import { FaUserCircle } from "react-icons/fa";

export default function CommentsLoad() {
  return (
    <div className={styles.comments}>
      {Array(3)
        .fill()
        .map((_, i) => (
          <div key={i} className={styles.comment_container}>
            <div className={styles.comment_icon}>
              <FaUserCircle size={30} />
            </div>
            <div className={styles.comment_text}></div>
          </div>
        ))}
    </div>
  );
}
