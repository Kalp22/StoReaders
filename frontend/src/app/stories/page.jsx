import dynamic from "next/dynamic";
import styles from "./page.module.css";
import AllStoriesLoad from "@/components/loading/allStoriesLoad";
const Stories = dynamic(() => import("@/components/fetch/stories"), {
  ssr: false,
  loading: () => <AllStoriesLoad />,
});

export default function StoryPage() {
  const description = true;

  return (
    <>
      <div className={styles.story_wrapper}>
        <Stories description={description} swiper={true} />
        <Stories description={description} swiper={false} />
      </div>
    </>
  );
}
