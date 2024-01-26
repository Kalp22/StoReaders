// "use client";
import styles from "./page.module.css";

import Navbar from "@/components/navbar/navbar";
import Stories from "@/components/fetch/stories";

export default function StoryPage() {
  const description = true;

  return (
    <>
      <Navbar />
      <div className={styles.story_wrapper}>
        <Stories description={description} swiper={true} />
        <Stories description={description} swiper={false} />
      </div>
    </>
  );
}
