import styles from "./spinnerLoad.module.css";

export default function SpinnerLoad() {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.spinner}></div>
    </div>
  );
}
