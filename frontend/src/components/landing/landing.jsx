import styles from "./landing.module.css";

import { Montserrat } from "next/font/google";
import { Raleway } from "next/font/google";

const montserrat = Montserrat({
  weight: ["variable"],
  subsets: ["latin"],
});

const raleway = Raleway({
  weight: ["variable"],
  subsets: ["latin"],
});

export default function Landing() {
  return (
    <div className={styles.landing_wrapper}>
      <div className={styles.landing_cover}>
        <div className={`${styles.title} ${montserrat.className}`}>
          StoReaders
        </div>
        <div className={`${styles.subtitle} ${raleway.className}`}>
          A place to read stories
        </div>
      </div>
    </div>
  );
}
