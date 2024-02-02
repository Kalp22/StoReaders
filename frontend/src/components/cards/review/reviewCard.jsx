import styles from "./reviewCard.module.css";

import { FaUserCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

export default function ReviewCard() {
  return (
    <div className={styles.review_card}>
      <header className={styles.head}>
        <div>
          <div>
            <FaUserCircle className={styles.user_icon} size={35} />
          </div>
          <div className={styles.user_name}>Username</div>
        </div>
        <div>
          <HiDotsVertical size={25} className={styles.dots} />
        </div>
      </header>
      <div className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maxime
        aspernatur perferendis, eum facilis dicta, ad ducimus rem consectetur
        reprehenderit aut animi praesentium inventore dolor? Rem ipsum
        voluptatum nobis tempore doloremque unde enim corporis velit neque vel
        quaerat aperiam error magni, dicta blanditiis accusantium amet illum
        eius iusto molestias qui? Quisquam, quos. Quisquam, quos. Quisquam,
      </div>
    </div>
  );
}
