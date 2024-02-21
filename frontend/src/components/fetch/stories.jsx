import SwiperComponent from "@/components/swiper/swiper";
import StoriesComponent from "@/components/stories/stories";
require("dotenv").config();

export default async function Stories({ description, swiper }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stories/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(process.env.API_URL);

  const data = await res.json();

  return (
    <>
      {swiper ? (
        <SwiperComponent data={data} />
      ) : (
        <StoriesComponent description={description} data={data && data} />
      )}
    </>
  );
}
