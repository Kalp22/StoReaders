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
      modules={[A11y, Autoplay]}  
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      spaceBetween={50}
      slidesPerView={1}
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
                  backgroundImage: `url(${imageURLS[i]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <SwipCard story={story} image={imageURLS[i]} />
              </div>
              {/* <div className={styles.arrows_wrapper}>
                <div className={styles.arrow_cover} onClick={()=>{swipMethod.slidePrev()}}>
                  <div className={styles.left_arrow}></div>
                </div>
                <div className={styles.arrow_cover} onClick={()=>{swipMethod.slideNext()}}>
                  <div className={styles.right_arrow}></div>
                </div>
              </div> */}
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
