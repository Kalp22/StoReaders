import SwiperComponent from "@/components/swiper/swiper";
import StoriesComponent from "@/components/stories/stories";
require("dotenv").config();

export default function Stories({ description, swiper, data }) {
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
