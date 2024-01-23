"use client";
import styles from "./page.module.css";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";

import Navbar from "@/components/navbar/navbar";
import Genre from "@/components/genre/genre";

import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Chapters from "@/components/chapters/chapters";

export default function StoryOverview({ params: { id } }) {
  const [story, setStory] = useState({
    _id: "",
    storyBasic: { storyName: "" },
    genre: [],
  });

  const [images, setImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("url()");
  const [descToggle, setDescToggle] = useState(true);

  //extracting and filtering image urls from google drive
  const imageURLS = images.map((image, i) => {
    const reducedURI = image.slice(0, -18);
    const id = reducedURI.split("/")[5];

    const string = "uc?export=view&id=";

    const url = `https://drive.google.com/${string}${id}`;
    return url;
  });

  //setting background image
  useEffect(() => {
    if (imageURLS[0]) {
      setBackgroundImage(`url(${imageURLS[0]})`);
    }
  }, [imageURLS]);

  //fetching story data
  useEffect(() => {
    fetch(" http://localhost:5000/stories/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storyName: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStory(data.story);
        setImages(data.dataURI);
      });
  }, []);

  //toggle description "read more" and "read less
  function descriptionToggle() {
    const description = document.querySelector(`.${styles.description}`);
    description.classList.toggle(styles.description_full);

    setDescToggle(!descToggle);
  }

  return (
    <div>
      <Navbar />
      <div className={styles.all_overview_wrapper}>
        <div className={styles.left_overview_wrapper}>
          <Image
            src={imageURLS[0]}
            height={350}
            width={250}
            loading="lazy"
            className={styles.story_image}
          />
          <div className={styles.info_wrapper}>
            <h1>{story.storyBasic.storyName}</h1>
            <div className={styles.genre_wrapper}>
              {story &&
                story.genre.map((genre, i) => {
                  return <Genre genre={genre} key={i} />;
                })}
            </div>
            <div className={styles.link}>
              <Link href={`/story/${id}/read/bdgg`}>
                <div className={styles.read_now}>Read Now</div>
              </Link>
            </div>
            <p className={styles.description}>{story.storyDescription}</p>
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
              <div className={styles.values}>
                {story.storyBasic.status ? "Ongoing" : "Completed"}
              </div>
            </div>
            <div className={styles.parameter_value_wrapper}>
              <div className={styles.parameters}>Views</div>
              <div className={styles.values}>{story.views}</div>
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
      <div
        style={{
          backgroundImage: backgroundImage,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={styles.chapters_overview_wrapper}
      >
        <Chapters _id={story._id} story_name={id} />
      </div>
    </div>
  );
}
