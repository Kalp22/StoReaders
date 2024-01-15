import styles from "./navbar.module.css";

import Link from "next/link";

import DarkLight from "../ui/darklight/page";

export default function Navbar() {
  return (
    <nav className={styles.navbar_wrapper}>
      <div className={styles.navbar_cover}>
        <div className={styles.navbar_left_cover}>
          <div>
            <Link href="/">HOME</Link>
          </div>
          <div>
            <Link href="/about">ABOUT</Link>
          </div>
          <div>
            <Link href="/stories">READ</Link>
          </div>
        </div>
        <div className={styles.navbar_right_cover}>
          <DarkLight />
          <div className={styles.partitioner}></div>
          <div>
            <Link href="/login">LOG IN</Link>
          </div>
          <div>
            <Link href="/signup">SIGN UP</Link>
          </div>
        </div>
      </div>
      <div className={styles.navbar_line}></div>
    </nav>
  );
}
