import styles from "./page.module.css";
import Link from "next/link";

export default function Signup() {
  return (
    <div className={styles.signup_wrapper}>
      <div className={styles.signup_cover}>
        <h1>Sign Up</h1>
        <form>
          <label>
            <div>USERNAME</div>
            <input type="text" name="username" required />
          </label>
          <label>
            <div>EMAIL ADDRESS</div>
            <input type="email" name="email" required />
          </label>
          <label>
            <div>PASSWORD</div>
            <input type="password" name="password" required />
          </label>
          <input type="submit" value="Sign Up" />
        </form>
        <div className={styles.already_account_log_in}>
          <div>Already have an account?</div>
          <div>
            <Link href="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
