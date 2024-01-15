"use client";
import styles from "./mainStoryComponent.module.css";

import Image from "next/image";
import Link from "next/link";

import Genre from "../genre/genre";

export default function MainStoryComponent() {
  const id = "820bb69jb";

  return (
    <div className={styles.main_story_image_container}>
      <div className={styles.main_story_wrapper}>
        <Link href="/story" className={styles.main_story_left}>
          <div className={styles.name_wrapper}>
            <div className={styles.main_name}>Story Name</div>
            <div className={styles.name_underline}></div>
          </div>
          <div className={styles.genre_wrapper}>
            <Genre />
            <Genre />
            <Genre />
          </div>
          <div className={styles.main_description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
            inventore nemo, optio sit laborum, officiis voluptate alias omnis
            nam at cupiditate veritatis numquam dignissimos quod. Veritatis
            voluptatum natus nemo, temporibus quisquam aspernatur! Quos dolor
            amet beatae tempore laudantium pariatur? Ex autem quasi maxime unde
            quibusdam velit? Assumenda, consectetur. Velit, officiis?
          </div>
        </Link>
        <div className={styles.main_story_right}>
          <Link href={`/story/${id}`}>
            <Image
              src="/wallpaper2.jpg"
              alt="story image"
              width={450}
              height={500}
              loading="lazy"
              className={styles.main_story_image}
            />
          </Link>
          <div className={styles.arrows_wrapper}>
            <div className={styles.arrow_cover}>
              <div className={styles.left_arrow}></div>
            </div>
            <div className={styles.arrow_cover}>
              <div className={styles.right_arrow}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
