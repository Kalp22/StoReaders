import Link from "next/link";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.about_wrapper}>
      <h2 className={styles.about_text}>About</h2>
      <div className={styles.about_line}></div>
      <div className={styles.about_content}>
        <p>Welcome to stoReaders - a place for captivating stories!</p>
        <p>Explore and enjoy a variety of stories on our platform.</p>
      </div>
      <div className={styles.about_content}>
        <h3>Tech Stack</h3>
        <ul>
          <li>Frontend: Built with Next.js</li>
          <li>Backend: Powered by Node.js and Express</li>
          <li>Database: MongoDB</li>
          <li>Icons: React Icons</li>
          <li>Deployment: Hosted on Vercel</li>
        </ul>
      </div>
      <div className={styles.about_content}>
        <h3>Source</h3>
        <Link
          href="https://github.com/Kalp22/stoReaders"
          className={styles.link}
        >
          Github Source
        </Link>
      </div>
    </div>
  );
}
