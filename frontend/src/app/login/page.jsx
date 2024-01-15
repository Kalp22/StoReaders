import styles from "./page.module.css";
import Link from "next/link";

export default function Login() {
  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_cover}>
        <h1>Log In</h1>
        <form>
          <label>
            <div>EMAIL ADDRESS</div>
            <input type="email" name="email" required />
          </label>
          <label>
            <div>PASSWORD</div>
            <input type="password" name="password" required />
          </label>
          <div className={styles.forget_password}>
            <Link href="/forgot_password">Forgot password?</Link>
          </div>
          <input type="submit" value="Log In" />
        </form>
        <div className={styles.no_account_sign_up}>
          <div>Don't have an account?</div>
          <div>
            <Link href="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
