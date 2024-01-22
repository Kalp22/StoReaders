"use client";
import styles from "./page.module.css";

import Navbar from "@/components/navbar/navbar";
import StoriesComponent from "@/components/stories/stories";
import MainStoryComponent from "@/components/mainStoryComponent/mainStoryComponent";

export default function StoryPage() {
  const description = true;

  return (
    <>
      <Navbar />
      <div className={styles.story_wrapper}>
        <MainStoryComponent />
        <StoriesComponent description={description} />
      </div>
    </>
  );
}
