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
