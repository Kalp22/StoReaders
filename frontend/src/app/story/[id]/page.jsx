"use client";
import styles from "./page.module.css";

import Link from "next/link";
import Image from "next/image";

import React from "react";

import Navbar from "@/components/navbar/navbar";
import Genre from "@/components/genre/genre";

import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Chapters from "@/components/chapters/chapters";

export default function StoryOverview({ params: { id } }) {
  const _id = id;

  const [descToggle, setDescToggle] = React.useState(true);

  const descriptionToggle = () => {
    const description = document.querySelector(`.${styles.description}`);
    description.classList.toggle(styles.description_full);

    setDescToggle(!descToggle);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.all_overview_wrapper}>
        <div className={styles.left_overview_wrapper}>
          <Image
            src="/wallpaper.jpg"
            height={350}
            width={250}
            loading="lazy"
            className={styles.story_image}
          />
          <div className={styles.info_wrapper}>
            <h1>Story Name</h1>
            <div className={styles.genre_wrapper}>
              <Genre />
              <Genre />
              <Genre />
            </div>
            <div className={styles.link}>
              <Link href={`/story/${_id}/read/bdgg`}>
                <div className={styles.read_now}>Read Now</div>
              </Link>
            </div>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              veritatis quam, tempore saepe optio deleniti consequatur eveniet
              suscipit recusandae. Mollitia aut, autem at consectetur ab debitis
              maxime quas dicta voluptates, blanditiis laborum necessitatibus.
              Cupiditate nam neque dolore dignissimos quidem. Rerum provident
              architecto distinctio quasi nemo aspernatur, laudantium incidunt
              assumenda quidem ipsum debitis vel sed velit inventore itaque quo
              harum. Architecto similique hic ut cum aspernatur rerum officia
              labore est vero explicabo quae suscipit error, soluta repellendus
              iusto harum facere quia quis saepe repellat. Ipsam, impedit sed.
              Deserunt, magni voluptates, earum atque voluptatibus, iure quam
              voluptatum consectetur sint animi vero commodi. Quisquam, quas
            </p>
            <div>
              <span
                className={styles.more_button}
                onClick={() => descriptionToggle()}
              >
                {descToggle ? "+ Read More" : "- Read Less"}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.right_overview_wrapper}>
          <div className={styles.all_parameters_wrapper}>
            <div className={styles.parameter_value_wrapper}>
              <div className={styles.parameters}>Status</div>
              <div className={styles.values}>Ongoing</div>
            </div>
            <div className={styles.parameter_value_wrapper}>
              <div className={styles.parameters}>Views</div>
              <div className={styles.values}>0</div>
            </div>
            <div className={styles.parameter_value_wrapper}>
              <FaStar className={styles.star} />
              <div className={styles.values}>9.5</div>
            </div>
          </div>
          <div className={styles.ratings_wrapper}>
            <div className={styles.rate_story}>Rate The Story</div>
            <div>
              <FaRegStar className={styles.rating_star} />
              <FaRegStar className={styles.rating_star} />
              <FaRegStar className={styles.rating_star} />
              <FaRegStar className={styles.rating_star} />
              <FaRegStar className={styles.rating_star} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.chapters_overview_wrapper}>
        <Chapters _id={_id} />
      </div>
    </div>
  );
}
