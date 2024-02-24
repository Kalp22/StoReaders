import styles from "./landing.module.css";

export default function Landing() {
  return (
    <div className={styles.landing_wrapper}>
      <div className={styles.landing_cover}>
        <div className={styles.title}>StoReaders</div>
        <div className={styles.subtitle}>A place to read stories</div>
      </div>
    </div>
  );
}
