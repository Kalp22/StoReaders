import styles from "./page.module.css";

import DarkLight from "@/components/ui/darklight/page";

export default function ChapterLayout({ children }) {
  return (
    <>
      <div className={styles.darklight}>
        <DarkLight />
      </div>
      {children}
    </>
  );
}
