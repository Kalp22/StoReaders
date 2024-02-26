import styles from "./spinnerLoad.module.css";

export default function SpinnerLoad({ comments }) {
  return (
    <div
      className={`${
        comments ? styles.spinner_container2 : styles.spinner_container
      }`}
    >
      <div className={`${comments ? styles.spinner2 : styles.spinner}`}></div>
    </div>
  );
}
