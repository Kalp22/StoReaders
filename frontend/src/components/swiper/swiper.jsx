"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import styles from "./swiper.module.css";
import SwipCard from "../cards/swipCards/swipCard";

export default function SwiperComponent({ data }) {
  const stories = data.story;
  let images = data.dataURI;

  const imageURLS = images.map((image, i) => {
    const reducedURI = image.slice(0, -18);
    const id = reducedURI.split("/")[5];

    const string = "uc?export=view&id=";

    const url = `https://drive.google.com/${string}${id}`;
    return url;
  });

  return (
    <Swiper
      modules={[A11y, Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      className={styles.swiper_wrapper}
    >
      {stories &&
        imageURLS &&
        stories.map((story, i) => {
          return (
            <SwiperSlide key={i}>
              <SwipCard story={story} image={imageURLS[i]} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
