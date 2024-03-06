import styles from "./page.module.css";

import Link from "next/link";

const AboutPage = () => {
  return (
    <div className={styles.about_wrapper}>
      <div className={styles.about_container}>
        <h1>About</h1>

        <section>
          <h2>Welcome to stoReaders!</h2>
          <p>
            Creating a space for readers to immerse themselves in captivating
            narratives.
          </p>
        </section>

        <section>
          <h2>Mission</h2>
          <p>
            At stoReaders, mission is simple: to provide an enjoyable and
            user-friendly platform for reading and sharing stories.
          </p>
        </section>

        <section>
          <h2>Tech Stack</h2>
          <ul>
            <li>
              <strong>Frontend: </strong> Built with
              <Link
                href="https://nextjs.org/"
                target="blank"
                className={styles.link}
              >
                {" "}
                Next.js{" "}
              </Link>
              for a seamless and interactive user experience.
            </li>
            <li>
              <strong>Backend: </strong> Powered by
              <Link
                href="https://nodejs.org/"
                target="blank"
                className={styles.link}
              >
                {" "}
                Node.js{" "}
              </Link>
              and
              <Link
                href="https://expressjs.com/"
                target="blank"
                className={styles.link}
              >
                {" "}
                Express{" "}
              </Link>
              for robust server-side functionality.
            </li>
            <li>
              <strong>Database: </strong>
              <Link
                href="https://www.mongodb.com/"
                target="blank"
                className={styles.link}
              >
                {" "}
                MongoDB{" "}
              </Link>{" "}
              for efficient data storage and retrieval.
            </li>
            <li>
              <strong>Icons: </strong> Icons from
              <Link
                href="https://react-icons.github.io/react-icons/"
                target="blank"
                className={styles.link}
              >
                {" "}
                React Icons{" "}
              </Link>
            </li>
            <li>
              <strong>Deployment: </strong> Hosted on
              <Link
                href="https://vercel.com/"
                target="blank"
                className={styles.link}
              >
                {" "}
                Vercel{" "}
              </Link>
              for reliable performance.
            </li>
          </ul>
        </section>
        <div className={styles.source}>
          <h2>Source</h2>
          <Link
            href="https://github.com/Kalp22/stoReaders"
            target="blank"
            className={styles.link}
          >
            Github Source
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
