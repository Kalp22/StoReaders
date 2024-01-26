"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";

import styles from "./swiper.module.css";
import SwipCard from "../cards/swipCards/swipCard";

export default function SwiperComponent({ data }) {
  const stories = data.story;
  const images = data.dataURI;

  const imageURLS = images.map((image, i) => {
    const reducedURI = image.slice(0, -18);
    const id = reducedURI.split("/")[5];

    const string = "uc?export=view&id=";

    const url = `https://drive.google.com/${string}${id}`;
    return url;
  });

  const imagesReverse = imageURLS.reverse();
  console.log(imagesReverse);

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      //   onSwiper={(swiper) => console.log(swiper)}
      loop={true}
      className={styles.swiper_wrapper}
    >
      {stories &&
        stories.map((story, i) => {
          return (
            <SwiperSlide key={i}>
              <div
                className={styles.container_image}
                style={{
                  backgroundImage: `url(${imagesReverse[i]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <SwipCard story={story} image={imageURLS[i]} />
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
