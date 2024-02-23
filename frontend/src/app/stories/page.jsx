import styles from "./page.module.css";
import Stories from "@/components/fetch/stories";

export default async function StoryPage() {
  const description = true;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stories/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return (
    <div className={styles.story_wrapper}>
      <Stories description={description} swiper={true} data={data} />
      <Stories description={description} swiper={false} data={data} />
    </div>
  );
}
