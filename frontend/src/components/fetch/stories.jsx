import SwiperComponent from "@/components/swiper/swiper";
import StoriesComponent from "@/components/stories/stories";

export default async function Stories({ description, swiper }) {
  const res = await fetch(`${process.env.API_URL}stories/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (swiper) {
    return <SwiperComponent data={data} />;
  } else {
    return <StoriesComponent description={description} data={data} />;
  }
}
