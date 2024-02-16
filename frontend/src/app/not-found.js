import Link from "next/link";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Not Found</h2>
      <p className={styles.p}>Could not find the requested resource</p>
      <Link href="/" className={styles.link}>
        Return Home
      </Link>
    </div>
  );
}
